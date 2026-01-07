# Instructions

This is a project for my personal site, developed using React Typescript, with the build being handled by Vite/ESBuild. I'm using Tanstack Query for routing and the goal is to create a site that is simple and I can add a few blog posts to it over time.

The site needs to be readble both on desktop and mobile devices, so responsiveness is key. The design should be minimalistic, focusing on content without unnecessary distractions.

When generating code, please ensure the following:
- I'm using Tailwind CSS for styling
- I have a custom font, labelled 'DepartureMonoRegular' for headings. I have yet to decide on a font for the body text.
- The home page has a different structure from the main post pages
    - They both have a top bar that has the site title on the left and page navigation on the right
    - Home page content is split into two with name and role and contact on the left and an about me on the right
    - The main post landing page lists out the articles that I have written
    - The posts themselves should have the content listed out like a google document 

Do not use dangerouslySetHTMLInner when rendering blog post content. Instead, use a markdown-to-React parser to ensure safety and maintainability.

Ensure all components are fully typed with TypeScript, avoiding the use of 'any' type to leverage TypeScript's type safety features.

When creating blog post content, structure it using markdown files stored in the 'src/content/posts' directory. Each markdown file should include YAML front matter for metadata such as title, date, slug, and description.