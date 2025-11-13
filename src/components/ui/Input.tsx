interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
}

export function Input({
    value,
    onChange,
    placeholder = 'Enter text...',
    type = 'text',
}: InputProps) {
    return (
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={[
                'w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700',
                'bg-white dark:bg-gray-800 text-black dark:text-white',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
            ].join(' ')}
            type={type}
            placeholder={placeholder}
        />
    );
}
