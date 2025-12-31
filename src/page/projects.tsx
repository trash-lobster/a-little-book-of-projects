import { type Dispatch, type SetStateAction } from "react";
import { ProjectHome } from "./projects/home";
import type { Projects } from "../skeleton";
import { InfiniteCanvasPage } from "./projects/infinite-canvas";
import { WebExtensionPage } from "./projects/web-extension";
import { PixelPage } from "./projects/pixel-lobster";
import { WizardPage } from "./projects/time-wizard";

interface ProjectsPageProps {
    project: Projects;
    setProject: Dispatch<SetStateAction<Projects>>;
}

export function ProjectsPage({
    project,
    setProject: setProjects,
}: ProjectsPageProps) {

    return (
        <>
            {
                project === 'home'
                    ? <ProjectHome setPage={setProjects}/>
                    : project === 'infinite-canvas'
                        ? <InfiniteCanvasPage toHome={() => setProjects('home')}/>
                        : project === 'web-extension'
                            ? <WebExtensionPage toHome={() => setProjects('home')}/>
                            : project === 'pixel'
                                ? <PixelPage toHome={() => setProjects('home')}/>
                                : project === 'wizard'
                                    ? <WizardPage toHome={() => setProjects('home')}/>
                                    : <div></div>
            }
        </>
    )
}