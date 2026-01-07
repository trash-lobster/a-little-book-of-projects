/// <reference types="vite/client" />

declare module '*.md' {
  import type { ComponentType } from 'react';
  
  interface MarkdownMetadata {
    title: string;
    date: string;
    slug: string;
    description: string;
  }
  
  interface MarkdownModule {
    attributes: MarkdownMetadata;
    html: string;
    react: ComponentType;
  }
  
  const markdown: MarkdownModule;
  export default markdown;
}
