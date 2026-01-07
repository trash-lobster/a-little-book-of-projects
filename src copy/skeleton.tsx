import { useState } from 'react';
import { Navbar } from './component/navbar/navbar';
import { HomePage } from './page/home';
import { AboutPage } from './page/about';
import { ContactPage } from './page/contact';
import { ProjectsPage } from './page/projects';

export type Page = 'home' | 'projects' | 'about' | 'contact';
export type Projects = 'home' | 'infinite-canvas' | 'web-extension' | 'pixel' | 'wizard';

export function Skeleton() {
    const [isProjectActive, setIsProjectActive] = useState(false);
    const [currPage, setCurrPage] = useState<Page>('home');
    const [project, setProject] = useState<Projects>('home');
    
    return (
        <>
            <nav id='navbar'>
                <h1>A Little Book of Projects</h1>
                <div>A Portolio Site of Random Things<br/>By Vincent</div>
            </nav>
            <svg width="100%" height="14">
                <defs>
                    <pattern id="pattern1" x="0" y="0" width="14" height="14" patternUnits="userSpaceOnUse">
                        <text x="0" y="6" id="background-text" fill="currentColor">-</text>
                    </pattern>
                </defs>
                <rect id="background-rect" x="0" y="0" width="100%" height="100%" fill="url(#pattern1)"></rect>
            </svg>
            <main id='main-body'>
                <Navbar 
                    isProjectActive={isProjectActive} 
                    onToggleProject={() => setIsProjectActive(!isProjectActive)}
                    closeProject={() => setIsProjectActive(false)}
                    setPage={setCurrPage}
                    setProject={setProject}
                    page={currPage}
                />
                <div id='content'>
                    {
                        currPage === 'home'
                            ? <HomePage/>
                            : currPage === 'about'
                                ? <AboutPage/>
                                : currPage === 'contact'
                                    ? <ContactPage/>
                                    : currPage === 'projects'
                                        ? <ProjectsPage project={project} setProject={setProject}/>
                                        : <div/>
                    }
                </div>
            </main>
        </>
    );
}