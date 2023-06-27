export default function Header() {
    return (
        <section
            id="free-chapters"
            aria-label="Free preview"
            className="scroll-mt-14 bg-blue-600 sm:scroll-mt-32"
        >
            <div className="overflow-hidden lg:relative">
                <Container
                    size="md"
                    className="relative grid grid-cols-1 items-end gap-y-12 py-20 lg:static lg:grid-cols-2 lg:py-28 xl:py-32"
                >
                    <Pattern className="absolute -top-32 left-0 w-full sm:left-3/4 sm:-top-5 sm:ml-8 sm:w-auto md:left-2/3 lg:left-auto lg:right-2 lg:ml-0 xl:right-auto xl:left-2/3" />
                    <div>
                        <h2 className="font-display text-5xl font-extrabold tracking-tight text-white sm:w-3/4 sm:text-6xl md:w-2/3 lg:w-auto">
                            Hasina Magic Kitchen
                        </h2>
                        <p className="mt-4 text-lg tracking-tight text-blue-200">
                            Magical meals for your magical momments
                        </p>
                    </div>
                </Container>
            </div>
        </section>
    );
}

import clsx from 'clsx';
const styles = {
    xs: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:px-2',
    sm: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-4xl lg:px-12',
    md: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-5xl lg:px-8',
    lg: 'mx-auto px-4 sm:px-6 md:max-w-2xl md:px-4 lg:max-w-7xl lg:px-8',
};
export function Container({
    size = 'sm',
    className,
    ...props
}: {
    size: 'xs' | 'sm' | 'md' | 'lg'; // Update the type to a union of allowed keys
    className?: string; // Use string as the type for className
}) {
    return <div className={clsx(styles[size], className)} {...props} />;
}

// --------------------------------------------------------------------
import { useId } from 'react';

export function Pattern({
    size = 40,
    gapX = 16,
    gapY = 8,
    pattern = [
        [0, 1, 0, 1, 1, 0, 1, 0],
        [1, 0, 1, 1, 0, 0, 0, 1],
        [0, 1, 0, 1, 1, 0, 1, 0],
        [1, 0, 1, 1, 0, 0, 0, 1],
    ],
    ...props
}) {
    let id = useId();
    let width = pattern[0].length * size + (pattern[0].length - 1) * gapX;
    let height = pattern.length * size + (pattern.length - 1) * gapY;

    return (
        <svg aria-hidden="true" width={width} height={height} {...props}>
            <defs>
                <symbol id={`${id}-0`} width={size} height={size}>
                    <rect
                        className="fill-blue-500"
                        width={size}
                        height={size}
                    />
                    <circle
                        className="fill-blue-600"
                        cx={size / 2}
                        cy={size / 2}
                        r={size * (13 / 40)}
                    />
                </symbol>
                <symbol id={`${id}-1`} width={size} height={size}>
                    <circle
                        className="fill-blue-300"
                        cx={size / 2}
                        cy={size / 2}
                        r={size / 2}
                    />
                    <rect
                        className="fill-blue-600"
                        width={size / 2}
                        height={size / 2}
                        x={size / 4}
                        y={size / 4}
                    />
                </symbol>
            </defs>
            {pattern.map((row, rowIndex) =>
                row.map((shape, columnIndex) => (
                    <use
                        key={`${rowIndex}-${columnIndex}`}
                        href={`#${id}-${shape}`}
                        x={columnIndex * size + columnIndex * gapX}
                        y={rowIndex * size + rowIndex * gapY}
                    />
                ))
            )}
        </svg>
    );
}
