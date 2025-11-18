import { NavLink } from 'react-router-dom';
import {
  BarChart3,
  FlaskConical,
  Heart,
  Shield,
  Lock,
  Users,
  FileText,
  BookOpen,
  Settings,
  Home,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/stats', icon: BarChart3, label: 'Stats Lab' },
  { to: '/study-design', icon: FlaskConical, label: 'Study Design' },
  { to: '/ethics', icon: Heart, label: 'Ethics' },
  { to: '/safety', icon: Shield, label: 'Safety' },
  { to: '/hipaa', icon: Lock, label: 'HIPAA' },
  { to: '/public-health', icon: Users, label: 'Public Health' },
  { to: '/cases', icon: FileText, label: 'Cases' },
  { to: '/assessment', icon: BookOpen, label: 'Assessment' },
  { to: '/glossary', icon: BookOpen, label: 'Glossary' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Navigation sidebar */}
      <nav
        className={cn(
          'fixed left-0 top-0 h-full w-64 bg-card border-r border-border z-40 transition-transform duration-300 ease-in-out',
          'md:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Title */}
          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-bold text-primary">BioEthics Lab</h1>
            <p className="text-xs text-muted-foreground mt-1">
              Population Health & Research
            </p>
          </div>

          {/* Navigation items */}
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                        'hover:bg-accent hover:text-accent-foreground',
                        isActive
                          ? 'bg-accent text-accent-foreground'
                          : 'text-muted-foreground'
                      )
                    }
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              © 2024 BioEthics Lab
            </p>
          </div>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
