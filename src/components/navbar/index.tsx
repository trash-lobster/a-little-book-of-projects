import { Link } from "@tanstack/react-router";

interface NavigationOption {
    target: string;
    label: string;
}

interface NavBarProps {
    options: NavigationOption[]
}

export function NavBar({options}: NavBarProps) {
    return (
        <nav className='flex flex-col items-center justify-center gap-2 py-4 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-full lg:flex-row lg:justify-between lg:py-4 max-w-7xl mx-auto'>
            <div className="dmr-font text-center">A Little Book of Projects</div>
            <ul className='flex flex-row gap-16 mt-2 lg:mt-0 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:flex-row lg:gap-4 lg:justify-between lg:py-4'>
                {
                    options.map((option) => 
                        <li className='transform transition-transform duration-200 ease-in-out hover:underline'>
                            <Link to={option.target}>
                                {option.label}
                            </Link>
                        </li>
                    )
                }
            </ul>
        </nav>
    )
}