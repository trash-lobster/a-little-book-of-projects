import { Link } from "@tanstack/react-router";

export function PostPage() {
    return (
        <>
            <nav className='flex flex-col items-center justify-center gap-2 py-4 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-full lg:flex-row lg:justify-between lg:py-4 max-w-7xl mx-auto'>
                <div className="dmr-font text-center">A Little Book of Projects</div>
                <ul className='flex flex-row gap-16 mt-2 lg:mt-0 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:flex-row lg:gap-4 lg:justify-between lg:py-4'>
                    <li className='transform transition-transform duration-200 ease-in-out hover:underline'>
                        <Link to='/'>
                            Home
                        </Link>
                    </li>
                    <li className='transform transition-transform duration-200 ease-in-out hover:underline'>
                        <Link to='/posts'>
                            Posts
                        </Link>
                    </li>
                </ul>
            </nav>
            <main
                className='pt-8 mx-auto max-w-7xl flex flex-col'
            >
                <div className='flex flex-col text-center border py-6'>
                    <span className="dmr-font mb-5 before:content-['—'] before:mr-2 after:content-['—'] after:ml-2">Projects</span>
                    <ul className='flex flex-col items-center list-none gap-4'>
                        <li className='shrink-0'>
                            <a id='github-link' className='hover:text-gray-700' href='' target="_blank" rel="noopener noreferrer">
                                Infinite Canvas Component
                            </a>
                        </li>
                        <li className='shrink-0'>
                            <a id='linkedin-link' className='hover:text-gray-700' href='' target="_blank" rel="noopener noreferrer">
                                Reffy Web Extension
                            </a>
                        </li>
                        <li className='shrink-0'>
                            <a id='linkedin-link' className='hover:text-gray-700' href='' target="_blank" rel="noopener noreferrer">
                                Pixel Lobster
                            </a>
                        </li>
                    </ul>
                </div>
                <div className='flex flex-col text-center border py-6'>
                    <span className="dmr-font mb-5 before:content-['—'] before:mr-2 after:content-['—'] after:ml-2">What did I learn?</span>
                    <ul className='flex flex-col items-center list-none gap-4'>
                        <li className='shrink-0'>
                            <a id='github-link' className='hover:text-gray-700' href='' target="_blank" rel="noopener noreferrer">
                                Getting started with 3JS
                            </a>
                        </li>
                        <li className='shrink-0'>
                            <a id='linkedin-link' className='hover:text-gray-700' href='' target="_blank" rel="noopener noreferrer">
                                Getting started with 3JS
                            </a>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    )
}