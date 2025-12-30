import { useLayoutEffect, useRef, useState } from "react";
import { ProjectOption } from "./project-option";

interface NavbarProps {
    isProjectActive: boolean;
    onToggle: () => void;
}

export function Navbar({ isProjectActive, onToggle }: NavbarProps) {
    const [containerWidth, setContainerWidth] = useState(0);

    const projectContainerRef = useRef<HTMLDivElement | null>(null);
    
    function calculate() {
        const container = projectContainerRef.current;
        if (!container) return;

        const width = container.getBoundingClientRect().width;
        setContainerWidth(width);
    }
    
    useLayoutEffect(() => {
        const handle = () => calculate();

        const containerEl = projectContainerRef.current;

        let observer: ResizeObserver | undefined;

        if (containerEl && typeof ResizeObserver !== 'undefined') {
            try {
                const roContainer = new ResizeObserver(handle);
                roContainer.observe(containerEl);
                observer = roContainer;
            } catch (e) {
                console.error(e);
            }
        }

        window.addEventListener('resize', handle);

        // initial measurement (layout effect runs after DOM mutations)
        handle();

        return () => {
            if (observer) observer.disconnect();
            window.removeEventListener('resize', handle);
        };
    }, [isProjectActive]);

    return (
        <aside>
            <ul>
                <button>About.</button>
                <div>
                    <button
                        id='project-button'
                        onClick={() => {
                            onToggle();
                            calculate();
                        }}
                        className={isProjectActive ? 'button-active' : ''}
                    >
                        Projects.
                    </button>
                    {
                        isProjectActive && (
                            <div id='projects' ref={projectContainerRef}>
                                <ProjectOption isProjectActive={isProjectActive} w={containerWidth} text='Custom Infinite Canvas'/>
                                <ProjectOption isProjectActive={isProjectActive} w={containerWidth} text='Reffy Web Extension'/>
                                <ProjectOption isProjectActive={isProjectActive} w={containerWidth} text='Pixel Lobster'/>
                                <ProjectOption isProjectActive={isProjectActive} w={containerWidth} text='Time Wizard'/>
                            </div>
                        )
                    }
                </div>
                <button>Contact.</button>
            </ul>
        </aside>
    )
}