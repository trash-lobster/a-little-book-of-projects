import type { Dispatch, SetStateAction } from "react";
import type { Projects } from "../../skeleton";

interface ProjectHomeProps {
    setPage: Dispatch<SetStateAction<Projects>>;
}

export function ProjectHome({
    setPage
}: ProjectHomeProps) {
    return (
        <div id='project-main'>
            <h1>Menu</h1>
            <p>Pick from a delectable selection of projects, each crafted to the best of my ability at the time.</p>
            <ul>
                <li onClick={() => setPage('infinite-canvas')}>
                    <span>Reffy Infinite Canvas</span>
                    <span className="dotted-line"></span>
                    <span className='cormorant-garamond'>An in-house brewed infinite canvas that is light on the tongue and served fast.</span>
                </li>
                <li onClick={() => setPage('web-extension')}>
                    <span>Reffy Web Extension</span>
                    <span className="dotted-line"></span>
                    <span className='cormorant-garamond'>Ease the chore of image reference collection from the web. A must-have for the artists out there.</span>
                </li>
                <li onClick={() => setPage('pixel')}>
                    <span>Pixel Lobster</span>
                    <span className="dotted-line"></span>
                    <span className='cormorant-garamond'>One can always learn more about the canvas.</span>
                </li>
                <li onClick={() => setPage('wizard')}>
                    <span>Time Wizard</span>
                    <span className="dotted-line"></span>
                    <span className='cormorant-garamond'>A Game Jam product filled with C and RayLib. A fantastic idea, executed pretty well if I dare say so.</span>
                </li>
            </ul>
        </div>
    )
}