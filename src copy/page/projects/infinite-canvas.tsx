import { useRef, useState, } from "react";
import { InfiniteCanvas } from "../../component/canvas/canvas";
import { useInfiniteCanvas } from "../../hooks/useInfiniteCanvas";
import type { InfiniteCanvasElement } from "@reffy/infinite-canvas";

interface PageProps {
    toHome: () => void;
}

export function InfiniteCanvasPage({ toHome } : PageProps) {
    const canvasRef = useRef<InfiniteCanvasElement | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const api = useInfiniteCanvas('demo-canvas');
    const imageInputRef = useRef<HTMLInputElement | null>(null);

    return (
        <div id='infinite-canvas-page'>
            <button
                className='project-home-button'
                onClick={toHome}
            >
                Back to Projects
            </button>
            <h1>Infinite Canvas - why make one yourself?</h1>
            <div style={{display: isLoading ? 'block' : 'none'}}>Loading canvas...</div>
            <div 
                className="infinite-canvas-container"
                style={{visibility: isLoading ? 'hidden' : 'visible'}}
            >
                <button
                    id="add-image-button"
                    title="Add Image"
                    onClick={() => imageInputRef.current?.click()}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                    >
                        <g
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                        >
                            <path d="M16 5h6m-3-3v6m2 3.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5" />
                            <path d="m21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                            <circle cx="9" cy="9" r="2" />
                        </g>
                    </svg>
                </button>
                <InfiniteCanvas
                    id='demo-canvas'
                    ref={canvasRef} 
                    width='700' 
                    height='500'
                    displayMode="windowed"
                    onLoad={() => setIsLoading(false)}
                />
                <input
                    id="add-image-input"
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: 'none' }}
                    onChange={async () => {
                        if (
                            !imageInputRef.current ||
                            !imageInputRef.current.files ||
                            imageInputRef.current.files.length === 0 ||
                            !api ||
                            !api.addImageFromLocal
                        )
                            return;
                        await api.addImageFromLocal(
                            imageInputRef.current.files,
                        );
                        imageInputRef.current.value = '';
                    }}
                />
            </div>
            <article className='cormorant-garamond'>
                <span>Dec 31, 2025</span>
                <p>This really is the unplanned sibling of Reffy Web Extension.</p>
                <p>I originally intended to rely purely on <a>Excalidraw</a>. It's a great piece of software. Why should I go and reinvent the wheel when the wheel is free and rolling?</p>
                <p>But I do know why I should not. It would take a lot of time. It would delay my self-imposed delivery of Reffy. Heck, it took half a year instead of 1 month because of this.</p>
                <p>I tried to convince myself that Excalidraw is not an overkill for a pure-image rendering canvas. I tried to convince myself that I would be a fool to write this by myself in an age of fast-delivery, build and sell.</p> 
                <p><b>Worst of all, I was convinced that I couldn't do it.</b></p>
                <p>I get anxious, because I've long forgot how to push past my own comfort zone. I forgot that Rome wasn't build in a day. I didn't believe that I can build anything worthwhile on my own.</p>
                <p>But in 2025, after my friend's wedding and a year of emotional turmoil, I realised that there's a beauty in trying. So I rolled my sleeves and tried to write as much of the infinite canvas myself.</p>
                <p>Sure, there are tools these days that can expedite any projects. I use them, but I'm proud to say that an overwhelming of the thinking was still done by me. It may not be something that everyone gets, but I do love the joy from looking back at some job well done.</p>
                <p>Instead of harping on about wanting to start learning graphics programming, I managed to try out using WebGL for the first time in my life (and did well enough to be where we are now).</p>
                <p>I wrote my first custom element and published my first package this year. Crucially, I gained confidence in myself to make more things in the future. Thanks Reffy.</p>
                <span className="dotted-line"></span>
                <h3>Wait, don't gloss over the Excalidraw stuff. Why aren't you using it?</h3>
                <p>Excalidraw is fantastic. It is used by so many different applications, either as integrated or as a plug in. I was writing the web extension in React, and the react component fit in perfectly. There was a little configuring around, but overall a pretty good experience.</p>
                <p>
                    But then, the problem started, because Excalidraw didn't give me everything I needed.
                </p>
                <ul>
                    <li>I needed a customised user control. Excalidraw doesn't let you edit the main user interface.</li>
                    <li>Excalidraw is a big package. The react package alone is just under 50 MB. (Writing a single-purposed infinite canvas resulted in a package that is just under 2 MB.)</li>
                    <li>The images you place into the canvas will lose its quality. The image is compressed. There are pros and cons to this. Let's discuss this further down.</li>
                    <li>I don't agree with all the choices made with the UX (scrolling doesn't trigger zoom irks me).</li>
                    <li>Ultimately, as the author, I get to choose how things work under the hood.</li>
                </ul>
                <h4>Limitations</h4>
                <p>
                    To give users the maximum flexibility to creating their user layout, I exposed the basic APIs, such as canvas mode change (from pan to select), snap to center. 
                    This means that the user can select the functions that are meaningful to them and choose their own representation of those functions with their own icons that might fit their system better.
                </p>
                <p>
                    I stripped away a lot of the functions that Excalidraw to reduce the size of the final product (Excalidraw also bundles different versions into its package, which is another advantage writing my package gave me).
                </p>
                <p>
                    Admittedly, this means that there are functions missing that you may desire, and I would strongly recommend you to request them and their use cases on the GitHub project site.
                    In fact, to keep the package as limited as possible, everything the engine draws on screen is either the background grid, or rectangles. Even the bounding box around your selections on screens are just rectangles.
                </p>
                <h4>Image quality</h4>
                <p>
                    Copying images that you have already added to the canvas and pasting it to the canvas is incredibly fast on Excalidraw, no matter how many images you've selected.
                </p>
                <p>
                    I was puzzled. I could tell from the data copied that each copy would actually collect the image data in base64 string, which is the same as my approach.
                    What could possibly be causing it? I spent an entire day investigating, never considering the fact that Excalidraw compresses the images you upload.
                </p>
                <p>
                    While Reffy does not perform a compression of the images you upload and it is ideal for an art reference application, it does come with its problems.
                </p>
                <p>Large image file sizes impact the following:</p>
                <ul>
                    <li>Initial rendering</li>
                    <li>Exporting the canvas</li>
                    <li>Deserializing the imported canvas</li>
                    <li>Storage size</li>
                </ul>
                <p>
                    It is a balancing exercise. I've added functions such as a clean up API that will remove unused image file form the database, but ultimately, the most important UX I can add is a loader wheel to keep users informed.
                </p>
                <span className="dotted-line"></span>
                <h3>Last comment</h3>
                <p>
                    Hope this is somewhat interesting! I did not cover a lot of technical ground here since the resources I linked below do a far better and more comprehensive job.
                    But I hope this encourages you to try something similar!
                </p>
                <p>
                    Maybe the next project should be something in 3D?
                </p>
                <span className="dotted-line"></span>
                <h3>Check out these resources!</h3>
                <ul>
                    <li><a href='https://github.com/trash-lobster/reffy-infinite-canvas' target="_blank" rel="noopener noreferrer">GitHub Repo for Reffy Infinite Canvas</a></li>
                    <li><a href='https://www.npmjs.com/package/@reffy/infinite-canvas' target="_blank" rel="noopener noreferrer">NPM - Reffy Infinite Canvas</a></li>
                    <li><a href='https://excalidraw.com/' target="_blank" rel="noopener noreferrer">Excalidraw</a></li>
                    <li><a href='https://infinitecanvas.cc/' target="_blank" rel="noopener noreferrer">An infinite canvas tutorial</a></li>
                    <li><a href='https://webglfundamentals.org/' target="_blank" rel="noopener noreferrer">WebGL Fundamentals</a></li>
                    <li><a href='https://lit.dev/' target="_blank" rel="noopener noreferrer">Lit Component - for making custom elements</a></li>
                </ul>
            </article>
        </div>
    )
}