import { createFileRoute, Link } from '@tanstack/react-router';
import { getPostBySlug } from '../../utils/posts';
import Markdown, { type Components } from 'react-markdown';
import { NavBar } from '../../components/navbar';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

export const Route = createFileRoute('/posts/$postId')({
    component: RouteComponent,
});

const options = [
    { target: '/', label: 'Home' },
    { target: '/experience', label: 'Experience' },
    { target: '/posts', label: 'Posts' },
];

const componentMap: Components = {
    h1(props) {
        const { children, ...rest } = props
        return (
            <h1 {...rest} className='dmr-font text-2xl sm:text-3xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4'>
                {children}
            </h1>
        )
    },
    h2(props) {
        const { children, ...rest } = props
        return (
            <h2 {...rest} className='dmr-font text-xl sm:text-2xl font-bold mt-5 sm:mt-6 mb-2 sm:mb-3'>
                {children}
            </h2>
        )
    },
    p(props) {
        const { children, ...rest } = props
        return (
            <p {...rest} className='mb-4 sm:mb-6 leading-8 sm:leading-7 text-base text-justify'>
                {children}
            </p>
        )
    },
    pre(props) {
        const { children, ...rest } = props
        return (
            <pre {...rest} className='my-4 sm:my-6 overflow-x-auto rounded-lg'>
                {children}
            </pre>
        )
    },
    code(props) {
        const { children, className, node, ...rest } = props
        const match = /language-(\w+)/.exec(className || '')
        return match ?
            (
                // @ts-ignore
                <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, '')}
                    language={match[1]}
                    customStyle={{
                        borderRadius: '0.5rem',
                        padding: '0.75rem',
                        fontSize: '0.8rem',
                    }}
                    wrapLongLines={true}
                />
            ) : (
                <code {...rest} className='bg-gray-100 px-1 sm:px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono text-red-500'>
                    {children}
                </code>
            )
    },
    blockquote(props) {
        const { children, ...rest } = props
        return (
            <blockquote {...rest} className='border-l-2 sm:border-l-4 border-gray-300 pl-3 sm:pl-4 my-3 sm:my-4 italic text-gray-700 text-sm sm:text-base'>
                {children}
            </blockquote>
        )
    },
    ul(props) {
        const { children, ...rest } = props
        return (
            <ul {...rest} className='list-disc list-outside mb-4 sm:mb-6 space-y-1.5 sm:space-y-2 sm:text-base'>
                {children}
            </ul>
        )
    },
    li(props) {
        const { children, ...rest } = props
        return (
            <li {...rest} className='ml-3 sm:ml-4'>
                {children}
            </li>
        )
    },
    ol(props) {
        const { children, ...rest } = props
        return (
            <ol {...rest} className='list-decimal list-outside mb-4 sm:mb-6 space-y-1.5 sm:space-y-2 sm:text-base'>
                {children}
            </ol>
        )
    },
    table(props) {
        const { children, ...rest } = props
        return (
            <div className='overflow-x-auto my-4 sm:my-6 -mx-4 sm:mx-0'>
                <table {...rest} className='min-w-full border-collapse border border-gray-300 text-sm sm:text-base'>
                    {children}
                </table>
            </div>
        )
    },
    thead(props) {
        const { children, ...rest } = props
        return (
            <thead {...rest} className='bg-gray-100'>
                {children}
            </thead>
        )
    },
    th(props) {
        const { children, ...rest } = props
        return (
            <th {...rest} className='border border-gray-300 px-2 sm:px-4 py-1.5 sm:py-2 text-left font-semibold text-sm sm:text-base'>
                {children}
            </th>
        )
    },
    td(props) {
        const { children, ...rest } = props
        return (
            <td {...rest} className='border border-gray-300 px-2 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base'>
                {children}
            </td>
        )
    },
    a(props) {
        const { children, href, ...rest } = props
        return (
            <a {...rest} href={href} className='text-blue-600 hover:underline break-words'>
                {children}
            </a>
        )
    }
}

function RouteComponent() {
    const { postId } = Route.useParams();
    const post = getPostBySlug(postId);

    if (!post) {
        return (
            <div className='min-h-screen flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-4xl dmr-font mb-4'>Post Not Found</h1>
                    <Link to='/posts' className='text-blue-600 hover:underline'>
                        Back to Posts
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <NavBar options={options} />
            <main className='pt-8 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8'>
                <article className='w-full'>
                    <div className='mb-6 sm:mb-8 text-center sm:text-left'>
                        <h1 className='dmr-font text-2xl sm:text-3xl lg:text-4xl mb-2'>{post.metadata.title}</h1>
                        <time className='text-gray-600 text-sm sm:text-base'>
                            {new Date(post.metadata.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>
                    </div>
                    <div className='sm:text-left'>
                        <Markdown
                            children={post.content}
                            components={componentMap}
                        />
                    </div>
                </article>
            </main>
        </>
    )
}
