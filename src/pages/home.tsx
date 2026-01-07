import { NavBar } from "../components/navbar";

const options = [
    { target: '/experience', label: 'Experience' },
    { target: '/posts', label: 'Posts' },
]

export function HomePage() {
    return (
        <>
            <NavBar options={options} />
            <main
                className='pt-8 mx-auto max-w-7xl'
            >
                <article className="lg:max-h-screen lg:w-full lg:flex lg:justify-between lg:gap-4 sm:px-4 px-6">
                    <div className="py-4 lg:text-start lg:w-[45%] text-center">
                        <div>
                            <h1 className='dmr-font lg:text-[44px] lg:font-medium mb-4'>Vincent Sit</h1>
                            <h2 className='mb-2'>Software Engineer</h2>
                            <p className='text-gray-500 mb-2'><i>Likes pretty things on the net, in games and art.</i></p>
                            <p className='text-gray-500 mb-2'><i>Travels to Japan way too much</i></p>
                        </div>
                        <div>
                            <ul className='ml-1 mt-8 flex items-center justify-center lg:justify-start list-none'>
                                <li className='mr-5 shrink-0 text-xs'>
                                    <a id='github-link' className='hover:text-gray-700' href='' target="_blank" rel="noopener noreferrer">
                                        <svg id='github-icon' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                            <path fill="currentColor" d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5c.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34c-.46-1.16-1.11-1.47-1.11-1.47c-.91-.62.07-.6.07-.6c1 .07 1.53 1.03 1.53 1.03c.87 1.52 2.34 1.07 2.91.83c.09-.65.35-1.09.63-1.34c-2.22-.25-4.55-1.11-4.55-4.92c0-1.11.38-2 1.03-2.71c-.1-.25-.45-1.29.1-2.64c0 0 .84-.27 2.75 1.02c.79-.22 1.65-.33 2.5-.33s1.71.11 2.5.33c1.91-1.29 2.75-1.02 2.75-1.02c.55 1.35.2 2.39.1 2.64c.65.71 1.03 1.6 1.03 2.71c0 3.82-2.34 4.66-4.57 4.91c.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2" />
                                        </svg>
                                    </a>
                                </li>
                                <li className='mr-5 shrink-0 text-xs'>
                                    <a id='linkedin-link' className='hover:text-gray-700' href='' target="_blank" rel="noopener noreferrer">
                                    <svg id='linkedin-icon' xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24">
                                        <path fill="currentColor" d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                                    </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='py-4 lg:w-[50%] text-justify'>
                        <p className='mb-4'>
                            I'm a software developer with a passion in learning how to put things on the screen, and make them pretty. Having grown up surrounded by games and anime, I naturally developed a taste for things on a screen. 
                            But I never thought I would be putting them there! My studies originally led me down another path.
                        </p>
                        <p className='mb-4'>
                            I strive to push my own limits and discomfort and do something new when I can. As a result, I spend a lot of time writing and reading about code, often something a little irrelevant.
                            I've recently released my own implementation of an infinite canvas web component and a web extension designed for artists to store their references.
                        </p>
                        <p className='mb-4'>
                            The purpose of this site is to record my little (or maybe not so little) projects and (sometimes) my learnings.
                            Most articles should be technology-related.
                            If it is a tutorial, I try to write my articles with beginners in mind, as I hope to interest and introduce newcomers to whatever topic I write about.
                        </p>
                        <p className='mb-4'>
                            On my off-days, I'm either climbing, drawing or picking out a new book to read. I recently got into motor racing and became a fan of Williams F1!
                        </p>
                    </div>
                </article>
            </main>
        </>
    )
}