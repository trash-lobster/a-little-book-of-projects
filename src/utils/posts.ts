// Utility to load all markdown posts
export interface PostMetadata {
    title: string;
    date: string;
    slug: string;
    description: string;
}

export interface Post {
    metadata: PostMetadata;
    content: string;
}

// Custom parser to extract YAML frontmatter from markdown
function parseFrontmatter(markdown: string): { metadata: PostMetadata; content: string } {
    const metadataRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdown.match(metadataRegex);
    
    if (!match) {
        throw new Error('Invalid markdown format: missing frontmatter');
    }
    
    const [, metadataText, content] = match;
    const metadata: Partial<PostMetadata> = {};
    
    // Parse YAML frontmatter line by line
    metadataText.split('\n').forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();
        
        // Remove quotes if present
        if ((value.startsWith('"') && value.endsWith('"')) || 
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }
        
        metadata[key as keyof PostMetadata] = value;
        }
    });
    
    return {
        metadata: metadata as PostMetadata,
        content: content.trim(),
    };
}

// Use Vite's glob import to load raw markdown files
const postModules = import.meta.glob<string>('../content/posts/*.md', { 
    eager: true,
    query: '?raw',
    import: 'default'
});

export function getAllPosts(): Post[] {
    const posts = Object.entries(postModules).map(([_, rawMarkdown]) => {
    const { metadata, content } = parseFrontmatter(rawMarkdown);
    console.log(content);
    return {
      metadata,
      content,
    };
  });

    // Sort by date (newest first)
    return posts.sort((a, b) => 
        new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime()
    );
}

export function getPostBySlug(slug: string): Post | null {
    const post = getAllPosts().find(p => p.metadata.slug === slug);
    return post || null;
}
