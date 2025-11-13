import { twMerge } from 'tailwind-merge';

export function Text({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={twMerge('text-black dark:text-white', className)}>{children}</p>;
}
