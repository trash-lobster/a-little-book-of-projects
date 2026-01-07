interface TreeBranchProps {
    width: number;
    height: number;
    isHovered: boolean;
}

export function TreeBranch({ width, height, isHovered, }: TreeBranchProps) {
    return (
        <svg 
            width={width} 
            height={height}
        >
            <line
                x1='20'
                y1='0'
                x2='20'
                y2={height / 2}
                stroke={isHovered ? "rgb(113, 113, 113)" : "oklch(0 0 0)"}
                strokeWidth="1"
            />
            <line
                x1='20'
                y1={height / 2}
                x2={width}
                y2={height / 2}
                stroke={isHovered ? "rgb(113, 113, 113)" : "oklch(0 0 0)"}
                strokeWidth="1"
            />
        </svg>
    )
}