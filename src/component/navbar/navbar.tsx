import { useLayoutEffect, useRef, useState, type Dispatch } from "react";
import { ProjectOption } from "./project-option";
import type { Page } from "../../skeleton";

interface NavbarProps {
    isProjectActive: boolean;
    onToggleProject: () => void;
    closeProject: () => void;
    setPage: Dispatch<React.SetStateAction<Page>>;
    page: string;
}

export function Navbar({ isProjectActive, onToggleProject, closeProject, setPage, page }: NavbarProps) {
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

        handle();

        return () => {
            if (observer) observer.disconnect();
            window.removeEventListener('resize', handle);
        };
    }, [isProjectActive]);

    return (
        <aside>
            <ul>
                <button 
                    className="nav-button"
                    onClick={() => {
                        setPage('home');
                        closeProject();
                    }}
                    disabled={page === 'home'}
                >
                    Home.
                </button>
                <button 
                    className="nav-button"
                    onClick={() => {
                        setPage('about');
                        closeProject();
                    }}
                    disabled={page === 'about'}
                >
                    About.
                </button>
                <div>
                    <button
                        id='project-button'
                        onClick={() => {
                            onToggleProject();
                            calculate();
                            setPage('projects');
                        }}
                        className={isProjectActive ? 'button-active nav-button' : 'nav-button'}
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
                <button
                    className="nav-button"
                    onClick={() => {
                        setPage('contact');
                        closeProject();
                    }}
                    disabled={page === 'contact'}
                >
                    Contact.
                </button>
            </ul>
        </aside>
    )
}