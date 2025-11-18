import { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { useAppStore } from '@/store/useAppStore';
import { WifiOff } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const isOffline = useAppStore((state) => state.isOffline);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="md:pl-64 min-h-screen">
        <div className="container mx-auto p-4 md:p-8 max-w-7xl">
          {isOffline && (
            <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-center gap-2">
              <WifiOff className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-yellow-500">
                You are currently offline. Some features may be limited.
              </span>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
};
