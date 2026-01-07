import { createFileRoute, Link } from '@tanstack/react-router'
import { getAllPosts } from '../../utils/posts'
import { NavBar } from '../../components/navbar';

export const Route = createFileRoute('/posts/')({
  component: RouteComponent,
})

const options = [
    { target: '/', label: 'Home' },
    { target: '/experience', label: 'Experience' },
];

function RouteComponent() {
  const posts = getAllPosts();

  return (
    <>
      <NavBar options={options} />
      <main className='pt-8 mx-auto max-w-7xl flex flex-col px-4'>
        <div className='flex flex-col text-center py-6'>
          <span className="dmr-font mb-5 text-2xl before:content-['—'] before:mr-2 after:content-['—'] after:ml-2">
            Articles
          </span>
          <ul className='flex flex-col items-start list-none gap-6 max-w-3xl mx-auto w-full px-8'>
            {posts.map((post) => (
              <li key={post.metadata.slug} className='w-full'>
                <Link 
                  to='/posts/$postId' 
                  params={{ postId: post.metadata.slug }}
                  className='block hover:bg-gray-50 p-4 rounded-lg transition-colors'
                >
                  <h2 className='text-xl font-semibold mb-2'>{post.metadata.title}</h2>
                  <p className='text-gray-600 text-sm mb-2'>
                    {new Date(post.metadata.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className='text-gray-700'>{post.metadata.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
