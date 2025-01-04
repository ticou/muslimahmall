import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CollapseProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  className?: string;
}

export const Collapse = ({ title, children, defaultOpen = false, className = '' }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={cn("bg-white border rounded-lg", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <span className="font-playfair text-xl text-dark-gray">{title}</span>
        <ChevronDown className={cn(
          "w-5 h-5 transition-transform",
          isOpen && "transform rotate-180"
        )} />
      </button>
      <div className={cn(
        "overflow-hidden transition-all duration-300",
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
};