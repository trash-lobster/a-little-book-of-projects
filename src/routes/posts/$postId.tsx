import { createFileRoute, Outlet } from '@tanstack/react-router'
import { installNavBar } from '../../components/navbar/install';

export const Route = createFileRoute('/posts/$postId')({
  component: RouteComponent,
})

const navPaths = [
    {
        displayText: 'Home',
        routePath: '/'
    },
    {
        displayText: 'About',
        routePath: '/about'
    },
    {
        displayText: 'Posts',
        routePath: '/posts'
    }
]

function RouteComponent() {
    const { Navbar } = installNavBar(navPaths);

    return (
        <div className='relative grid min-h-screen grid-cols-5 gap-x-10 bg-[#F5F5F5]/20 max-sm:grid-cols-1 md:mx-8 xl:mx-0'>
            <Navbar/>
            <main className='col-span-full w-full max-w-5xl flex-1 xl:col-span-3 xl:col-start-2 xl:justify-self-center'>
                <Outlet />
            </main>
        </div>
    )
}
