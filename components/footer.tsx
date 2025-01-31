import { Home } from 'lucide-react';

export const Footer = () => {
  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-lg shadow-sm lg:mb-4 lg:border relative ">
      <div className="border-t p-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
          <div className="flex items-center gap-2">
            <Home size={20} />
            <h2 className="text-md font-normal">Home</h2>
          </div>

          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground"> 2024</p>

            <div className="h-3 border-r" />

            <span className="text-xs text-muted-foreground">
              Data provided by Home
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
