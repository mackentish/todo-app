import { useState } from 'react';

interface SegmentedControlProps<T extends string> {
    segments: T[];
    onSegmentChange: (segment: T) => void;
}

export function SegmentedControl<T extends string>({
    segments,
    onSegmentChange,
}: SegmentedControlProps<T>) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSegmentClick = (index: number) => {
        setActiveIndex(index);
        onSegmentChange(segments[index]);
    };

    return (
        <div className="flex flex-row gap-2 bg-gray-200 p-1 rounded-lg w-full">
            {segments.map((segment, index) => (
                <button
                    key={index}
                    onClick={() => handleSegmentClick(index)}
                    className={`px-4 py-2 rounded-lg cursor-pointer w-full ${
                        activeIndex === index
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:text-gray-900 hover:font-semibold transition-all duration-200'
                    }`}
                >
                    {segment}
                </button>
            ))}
        </div>
    );
}
