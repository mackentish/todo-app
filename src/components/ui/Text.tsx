export function Text({ children, className }: { children: React.ReactNode; className?: string }) {
    return <p className={`text-black dark:text-white ${className}`}>{children}</p>;
}
