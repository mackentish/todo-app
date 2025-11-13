interface InputProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    type?: string;
    onEnterPress?: () => void;
    /** Should only be used when the user explicitly triggers an input action. */
    autoFocus?: boolean;
}

export function Input({
    value,
    onChange,
    placeholder = 'Enter text...',
    type = 'text',
    onEnterPress,
    autoFocus = false,
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
            autoFocus={autoFocus} // eslint-disable-line -- autoFocus is intentionally used here for better UX when user explicitly triggers an input action
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onEnterPress?.();
                }
            }}
        />
    );
}
