import { cn } from '@/core/utils/cn';

interface LoadingSpinnerProps {
  className?: string;
}

export const LoadingSpinner = ({ className }: LoadingSpinnerProps) => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className={cn(
          'animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600',
          className
        )}
      ></div>
    </div>
  );
};
