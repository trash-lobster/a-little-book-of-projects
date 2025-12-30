import { type Dispatch, type SetStateAction } from "react";
import { ProjectHome } from "./projects/home";
import type { Projects } from "../skeleton";
import { InfiniteCanvasPage } from "./projects/infinite-canvas";


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
                        : <div></div>
            }
        </>
    )
}