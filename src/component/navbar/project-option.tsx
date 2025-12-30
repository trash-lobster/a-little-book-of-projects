import { useLayoutEffect, useRef, useState, } from "react";
import { TreeBranch } from "./tree-branch";

interface ProjectOptionProps {
    w: number;
    text: string;
    isProjectActive: boolean;
}

export function ProjectOption({ w: containerWidth, text, isProjectActive }: ProjectOptionProps) {
    const projectRef = useRef<HTMLSpanElement | null>(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    
    useLayoutEffect(() => {
        function calculate() {
            const span = projectRef.current;

            const compute = (s: HTMLSpanElement | null) => {
                if (!s) return 0;
                const w = s.getBoundingClientRect().width;
                return Math.max(0, Math.floor(containerWidth - w - 10));
            };

            if (span) {
                setWidth(compute(span));
                setHeight(Math.floor(span.getBoundingClientRect().height));
            }
        }

        const handle = () => calculate();
        const observers: ResizeObserver[] = [];

        const span = projectRef.current;

        if (span && typeof ResizeObserver !== 'undefined') {
            try {
                const ro = new ResizeObserver(handle);
                ro.observe(span);
                observers.push(ro);
            } catch (e) {
                console.error(e);
            }
        }

        window.addEventListener('resize', handle);

        // initial measurement
        handle();

        return () => {
            observers.forEach((r) => r.disconnect());
            window.removeEventListener('resize', handle);
        };
    }, [isProjectActive, containerWidth]);

    return (
        <div>
            <TreeBranch isHovered={isHovered} width={width} height={height}/>
            <span 
                ref={projectRef} 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {text}
            </span>
        </div>
    )
}