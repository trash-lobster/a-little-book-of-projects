import marquee from '../../assets/screenshots/wizard.png';

interface PageProps {
    toHome: () => void;
}

export function WizardPage({ toHome } : PageProps) {
    return (
        <div id='infinite-canvas-page'>
            <button
                className='project-home-button'
                onClick={toHome}
            >
                Back to Projects
            </button>
            <h1>Time Wizard - GMTK Game Jam 2025 Entry</h1>
            <img src={marquee} alt='reffy banner' style={{width: '600px', height: '600px', border: '2px solid black'}}/>
            <article className='cormorant-garamond'>
                <div>
                    <span>Dec 31, 2025</span>
                </div>
                <p>
                    We teamed up for the GMTK Game Jam this year! In four days, we put together a rudimentary game engine and assets to create a time looping wizard who won't quit!
                </p>
                <p>
                    We utilised C and the library Raylib to create this game.
                </p>
                <span className="dotted-line"></span>
                <h3>Check out these resources!</h3>
                <ul>
                    <li><a href='https://dinkeltwinkel.itch.io/time-wiza' target="_blank" rel="noopener noreferrer">Itch.io site</a></li>
                    <li><a href='https://github.com/gahgeet/project_loop' target="_blank" rel="noopener noreferrer">GitHub Repo</a></li>
                </ul>
            </article>
        </div>
    )
}