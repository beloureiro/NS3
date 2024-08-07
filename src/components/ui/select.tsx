// src/components/ui/select.tsx

import * as React from 'react';
import { cn } from '@/lib/utils'; // Certifique-se de que o utilitário `cn` existe e está corretamente importado

// Componente principal Select
const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ className, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        "block w-full rounded border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm",
        className
      )}
      {...props}
    />
  )
);
Select.displayName = 'Select';

// Componente de gatilho SelectTrigger
const SelectTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "cursor-pointer bg-gray-100 border border-gray-300 rounded px-3 py-2 hover:bg-gray-200",
        className
      )}
      {...props}
    />
  )
);
SelectTrigger.displayName = 'SelectTrigger';

// Componentes auxiliares para SelectItem, SelectContent, e SelectValue
const SelectItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("px-3 py-2 cursor-pointer hover:bg-gray-200", className)} {...props} />
  )
);
SelectItem.displayName = 'SelectItem';

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-lg", className)} {...props} />
  )
);
SelectContent.displayName = 'SelectContent';

const SelectValue = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex items-center", className)} {...props} />
  )
);
SelectValue.displayName = 'SelectValue';

export { Select, SelectTrigger, SelectItem, SelectContent, SelectValue };
