import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showLabel?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, max = 100, showLabel = false, ...props }, ref) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    return (
      <div className="w-full space-y-1">
        {showLabel && (
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{percentage.toFixed(0)}%</span>
          </div>
        )}
        <div
          ref={ref}
          className={cn(
            'relative h-2 w-full overflow-hidden rounded-full bg-secondary',
            className
          )}
          {...props}
        >
          <div
            className="h-full bg-primary transition-all duration-300 ease-in-out"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };
