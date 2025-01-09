import * as React from 'react';
import { Bell, Loader2, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabaseClient';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';

type Notification = {
  id: number;
  content: string;
  created_at: string;
  type: string;
  is_read: boolean;
  sender_clerk_id: string;
  user_id: string;
  receiver_clerk_id: string;
};

export const NotificationDropdown = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = React.useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = React.useState(0);
  const [processingIds, setProcessingIds] = React.useState<Set<number>>(
    new Set()
  );
  const [showAllNotifications, setShowAllNotifications] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadNotifications = React.useCallback(async () => {
    if (!user?.id) return;
    setIsLoading(true);

    try {
      const query = supabase()
        .from('notifications')
        .select('*')
        .eq('receiver_clerk_id', user.id)
        .order('created_at', { ascending: false });

      // If not showing all, only get unread and recent notifications
      if (!showAllNotifications) {
        query.or(
          'is_read.eq.false,created_at.gte.' +
            new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        );
      }

      const { data, error } = await query;

      if (error) throw error;

      setNotifications(data || []);
      setUnreadCount(
        (data || []).filter((notification) => !notification.is_read).length
      );
    } catch (error) {
      console.error('Error loading notifications:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id, showAllNotifications]);

  const createNotification = async (
    receiverClerkId: string,
    type: string,
    content: string,
    senderClerkId?: string
  ) => {
    try {
      // Get receiver's user_id from clerk_id
      const { data: userData, error: userError } = await supabase()
        .from('users')
        .select('id')
        .eq('clerk_id', receiverClerkId)
        .single();

      if (userError) throw userError;
      if (!userData) throw new Error('User not found');

      const { error: notifError } = await supabase()
        .from('notifications')
        .insert([
          {
            user_id: userData.id,
            type,
            content,
            receiver_clerk_id: receiverClerkId,
            sender_clerk_id: senderClerkId,
          },
        ]);

      if (notifError) throw notifError;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  };

  const markAsRead = async (notificationId: number) => {
    if (!user?.id) return;

    const { error } = await supabase()
      .from('notifications')
      .update({ is_read: true })
      .eq('id', notificationId);

    if (!error) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    }
  };

  const archiveNotification = async (notificationId: number) => {
    if (!user?.id) return;

    try {
      // First mark as read
      await markAsRead(notificationId);

      // Remove from local state immediately
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error('Error archiving notification:', error);
    }
  };

  const handleFriendRequest = async (
    notificationId: number,
    senderId: string,
    action: 'accept' | 'reject'
  ) => {
    if (processingIds.has(notificationId)) return;
    setProcessingIds((prev) => new Set([...prev, notificationId]));

    try {
      // Remove notification from list immediately
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));

      // Update friend request status
      const { error: updateError } = await supabase()
        .from('friend_requests')
        .update({ status: action === 'accept' ? 'accepted' : 'rejected' })
        .eq('sender_clerk_id', senderId)
        .eq('receiver_clerk_id', user?.id);

      if (updateError) throw updateError;

      if (action === 'accept') {
        // Get user IDs for both users
        const { data: users, error: usersError } = await supabase()
          .from('users')
          .select('id, clerk_id')
          .in('clerk_id', [senderId, user?.id]);

        if (usersError) throw usersError;
        if (!users || users.length !== 2) {
          throw new Error(
            `Could not find users. Found: ${JSON.stringify(users)}`
          );
        }

        const currentUser = users.find((u) => u.clerk_id === user?.id);
        const friendUser = users.find((u) => u.clerk_id === senderId);

        if (!currentUser || !friendUser) {
          throw new Error(
            `Invalid user match. Current: ${JSON.stringify(currentUser)}, Friend: ${JSON.stringify(friendUser)}`
          );
        }

        // Add users as friends using RPC
        const { error: rpcError } = await supabase().rpc('add_friend', {
          user_id: currentUser.id,
          friend_id: friendUser.id,
        });

        if (rpcError) throw rpcError;

        // Send notification to the friend that their request was accepted
        await createNotification(
          senderId,
          'friend_accept',
          `${user?.firstName} ${user?.lastName} accepted your friend request!`,
          user?.id
        );
      }

      // Mark notification as read
      await markAsRead(notificationId);
    } catch (error) {
      console.error('Error handling friend request:', error);
      // If there was an error, add the notification back
      loadNotifications();
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(notificationId);
        return newSet;
      });
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleString();
  };

  React.useEffect(() => {
    loadNotifications();

    // Subscribe to new notifications
    if (!user?.id) return;

    const channel = supabase()
      .channel('notifications-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `receiver_clerk_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('New notification:', payload);
          setNotifications((prev) => [payload.new as Notification, ...prev]);
          setUnreadCount((prev) => prev + 1);
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [user?.id, loadNotifications]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center translate-x-1/3 -translate-y-1/3">
              {unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex flex-col max-h-[80vh] overflow-hidden">
          <div className="px-4 py-3 font-medium border-b">Notifications</div>
          <div className="overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  onClick={() =>
                    notification.type !== 'friend_request' &&
                    markAsRead(notification.id)
                  }
                  className={cn(
                    'flex flex-col items-start gap-1 p-3 cursor-pointer group',
                    !notification.is_read && 'bg-accent'
                  )}
                >
                  <div className="flex justify-between w-full">
                    <p className="text-sm">{notification.content}</p>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        archiveNotification(notification.id);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  {notification.type === 'friend_request' && (
                    <div className="flex gap-2 mt-2">
                      <Button
                        size="sm"
                        variant="default"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFriendRequest(
                            notification.id,
                            notification.sender_clerk_id,
                            'accept'
                          );
                        }}
                        disabled={processingIds.has(notification.id)}
                      >
                        Accept
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFriendRequest(
                            notification.id,
                            notification.sender_clerk_id,
                            'reject'
                          );
                        }}
                        disabled={processingIds.has(notification.id)}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {formatDate(notification.created_at)}
                  </span>
                </DropdownMenuItem>
              ))
            )}
          </div>
          {!showAllNotifications && notifications.length > 0 && (
            <Button
              variant="ghost"
              className="m-2"
              onClick={() => setShowAllNotifications(true)}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  Loading... <Loader2 className="h-4 w-4 animate-spin" />
                </span>
              ) : (
                'Show more'
              )}
            </Button>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
