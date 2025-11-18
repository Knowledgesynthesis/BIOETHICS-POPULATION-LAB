import * as React from 'react';
import { cn } from '@/lib/utils';

interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
}

export const Slider = React.forwardRef<HTMLInputElement, SliderProps>(
  (
    {
      className,
      value,
      onChange,
      min = 0,
      max = 100,
      step = 1,
      label,
      showValue = true,
      formatValue,
      ...props
    },
    ref
  ) => {
    const displayValue = formatValue ? formatValue(value) : value.toFixed(2);

    return (
      <div className="w-full space-y-2">
        {(label || showValue) && (
          <div className="flex justify-between items-center">
            {label && <label className="text-sm font-medium">{label}</label>}
            {showValue && (
              <span className="text-sm text-muted-foreground font-mono">{displayValue}</span>
            )}
          </div>
        )}
        <input
          ref={ref}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={cn(
            'w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            '[&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4',
            '[&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary',
            '[&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:transition-all',
            '[&::-webkit-slider-thumb]:hover:scale-110',
            '[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full',
            '[&::-moz-range-thumb]:bg-primary [&::-moz-range-thumb]:border-0',
            '[&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:transition-all',
            '[&::-moz-range-thumb]:hover:scale-110',
            className
          )}
          {...props}
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatValue ? formatValue(min) : min}</span>
          <span>{formatValue ? formatValue(max) : max}</span>
        </div>
      </div>
    );
  }
);

Slider.displayName = 'Slider';
