import { NavBar as InnerNavbar } from "./index";

export interface NavigationOption {
    displayText: string,
    routePath: string,
}

export function installNavBar(options: NavigationOption[]) {
    const Navbar = () => {
        return (
            <InnerNavbar options={options}/>
        )
    }
    
    return {
        Navbar,
    }
}