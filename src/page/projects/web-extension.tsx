import marquee from '../../assets/screenshots/marquee.jpg';

interface PageProps {
    toHome: () => void;
}

export function WebExtensionPage({ toHome } : PageProps) {
    return (
        <div id='infinite-canvas-page'>
            <button
                className='project-home-button'
                onClick={toHome}
            >
                Back to Projects
            </button>
            <h1>Reffy - a web extension for reference collection</h1>
            <img src={marquee} alt='reffy banner' style={{width: '280px', height: '700px', border: '2px solid black'}}/>
            <article className='cormorant-garamond'>
                <div>
                    <span>Dec 31, 2025</span>
                </div>
                <p>
                    I started this project because I thought that copying and pasting images from the web to my art reference app was a little tedious.
                    Also, when I'm not in my art-referencing-hunting mode, I can forget to save images.
                </p>
                <p>
                    What's my solution then?
                    Make a web extension that lets you collect images to an inbox that you can access through a canvas anytime!
                </p>
                <p>
                    Bear with me, that's a little bit of a oversimplification.
                </p>
                <span className="dotted-line"></span>
                <h3>Action flow</h3>
                <ol>
                    <li>The user finds an image that they like and want to save for reference.</li>
                    <li>Right click to activate the context menu and select one of the image save options.</li>
                    <li>The image is now saved to the browser local database. Any opened canvas will receive a real time update that a new image is available.</li>
                    <li>The canvas can be opened up and your images are right there for you to add to the canvas!</li>
                </ol>
                <span className="dotted-line"></span>
                <h3>Challenges</h3>
                <p>
                    I've started working on this at the time when web extensions are transitioning to Manifest v3. Features have been removed, new restrictions have been placed.
                    I wish I started my web development journey before that had happened, but best not to dwell on the past.
                </p>
                <p>
                    One of the toughest challenges is that you cannot keep background scripts alive anymore.
                    This means that you cannot keep states in the background script.
                    No real time update to any active canvas can be made (without additional tinkering).
                </p>
                <p>
                    Instead, the way I chose to get around this is to store the tab id of any canvases created to the browser's local storage. 
                    Anytime an image is saved, the background script is started afresh. The script will check for the active canvas id in the local storage and send a message to add the image to the tabs.
                </p>
                <p>
                    This is a hack-y way of doing things, but since web extension has become more limited, this is the best I can do for now.
                </p>
                <span className="dotted-line"></span>
                <h3>Limitation / Future Plans</h3>
                <p>
                    The three options that the web extension adds to the context menu are 1) Save Image, 2) Crop and Save and 3) Save Window. Each of them are self-explanatory. 
                    The latter two options are available at any time, but 'Save Image' only works when your mouse was over an &lt;img/&gt; file.
                </p>
                <p>
                    This means that sites that obscures the images or display through another element tag will prevent the extension from working properly.
                </p>
                <p>
                    There's definitely a way to get around that. I just haven't gotten around to finding it.
                </p>
                <span className="dotted-line"></span>
                <h3>Last comment</h3>
                <p>
                    I have submitted the extension to both Firefox and Chrome Marketplace for review. Pending acceptance, they should be available soon!
                </p>
                <span className="dotted-line"></span>
                <h3>Check out these resources!</h3>
                <ul>
                    <li><a href='https://github.com/trash-lobster/reffy-extension-local/tree/feature/new-infinite-canvas' target="_blank" rel="noopener noreferrer">GitHub Repo</a></li>
                    <li><a href='https://chenhuijing.com/blog/learning-web-extensions/' target="_blank" rel="noopener noreferrer">Learning web extensions</a></li>
                    <li><a href='https://css-tricks.com/how-to-transition-to-manifest-v3-for-chrome-extensions/' target="_blank" rel="noopener noreferrer">How to Transition to Manifest V3 for Chrome Extensions</a></li>
                </ul>
            </article>
        </div>
    )
}