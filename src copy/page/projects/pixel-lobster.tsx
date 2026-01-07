import marquee from '../../assets/screenshots/pixel.png';

interface PageProps {
    toHome: () => void;
}

export function PixelPage({ toHome } : PageProps) {
    return (
        <div id='infinite-canvas-page'>
            <button
                className='project-home-button'
                onClick={toHome}
            >
                Back to Projects
            </button>
            <h1>Pixel Lobster - online pixel art maker</h1>
            <img src={marquee} alt='reffy banner' style={{width: '600px', height: '600px', border: '2px solid black'}}/>
            <article className='cormorant-garamond'>
                <div>
                    <span>Dec 31, 2025</span>
                </div>
                <p>
                    A react project that I started as a jumping board to learn better architecture.
                </p>
                <p>
                    Dependency injection is a common pattern in .Net core applications. It is a good pattern for maintenance and working in teams.
                    The install pattern here is a version of it that allows us to separate business logic from the UI elements.
                </p>
                <span className="dotted-line"></span>
                <h3>Check out these resources!</h3>
                <ul>
                    <li><a href='https://pixel-lobster.netlify.app/' target="_blank" rel="noopener noreferrer">Live Site</a></li>
                    <li><a href='https://github.com/trash-lobster/pixel-lobster' target="_blank" rel="noopener noreferrer">GitHub Repo</a></li>
                </ul>
            </article>
        </div>
    )
}