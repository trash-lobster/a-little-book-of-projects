import { Link } from "@tanstack/react-router";
import type { NavigationOption } from "./install";

interface NavBarProps {
    options: NavigationOption[]
}

export function NavBar({options}: NavBarProps) {
    return (
        <nav
            className="p-4 pl-8 flex flex-col gap-4 text-[22px] nav fixed left-0 bg-red-200 min-h-screen w-100"
        >
            <Link
                to='/'
            >
                A Little Book of Projects
            </Link>
            {
                options.map((option) => 
                    <Link
                        to={option.routePath}
                        activeProps={{
                            className: 'font-bold',
                        }}
                        activeOptions={{ exact: true }}
                    >
                        {option.displayText}
                    </Link>
                )
            }
        </nav>
    )
}