import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function GlassCard({ children, className, hover = true }: { children: React.ReactNode, className?: string, hover?: boolean }) {
  return (
    <div className={cn(
      "relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden",
      hover && "transition-all duration-300 hover:bg-white/10 hover:border-white/20",
      className
    )}>
      {children}
    </div>
  );
}

export function NeonButton({ children, onClick, className, variant = 'blue', disabled = false, loading = false }: { children: React.ReactNode, onClick?: () => void, className?: string, variant?: 'blue' | 'purple' | 'red' | 'ghost', disabled?: boolean, loading?: boolean }) {
  const variants = {
    blue: "bg-blue-600 hover:shadow-blue-500/50 text-white",
    purple: "bg-purple-600 hover:shadow-purple-500/50 text-white",
    red: "bg-red-600 hover:shadow-red-500/50 text-white",
    ghost: "bg-transparent hover:bg-white/5 text-gray-400 hover:text-white border border-white/10"
  };

  return (
    <button 
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "relative py-2.5 px-5 rounded-xl font-bold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100",
        variants[variant],
        className
      )}
    >
      <div className="flex items-center justify-center gap-2">
        {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
        {children}
      </div>
    </button>
  );
}
