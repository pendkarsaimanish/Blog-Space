import { User, Blog } from '../types';

export const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'Full-stack developer passionate about React and Node.js. Love to share knowledge through writing.',
    joinDate: '2023-01-15'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150',
    bio: 'UI/UX Designer with a passion for creating beautiful and functional designs.',
    joinDate: '2023-02-20'
  }
];

export const sampleBlogs: Blog[] = [
  {
    id: '1',
    title: 'Getting Started with React 18',
    content: `React 18 introduces several new features that make building user interfaces more efficient and enjoyable. In this comprehensive guide, we'll explore the new concurrent features, automatic batching, and the new Suspense improvements.

## Concurrent Features

React 18's concurrent features allow React to interrupt, pause, resume, or abandon a render. This means React can respond to user input quickly even when it's in the middle of a heavy rendering task.

## Automatic Batching

React 18 adds automatic batching for fewer re-renders and better performance. Previously, React only batched updates inside React event handlers, but now it batches updates everywhere.

## Suspense Improvements

Suspense in React 18 works better with server-side rendering and provides better user experience with streaming HTML and selective hydration.

These features make React applications more responsive and provide better user experience overall.`,
    excerpt: 'Explore the exciting new features in React 18 including concurrent rendering, automatic batching, and improved Suspense.',
    authorId: '1',
    authorName: 'John Doe',
    publishedAt: '2024-01-15',
    tags: ['React', 'JavaScript', 'Web Development'],
    readTime: 8
  },
  {
    id: '2',
    title: 'Modern CSS Techniques for Better UI',
    content: `CSS has evolved significantly over the years, and modern techniques can help you create stunning user interfaces with less code and better maintainability.

## CSS Grid and Flexbox

These layout systems have revolutionized how we approach web layouts. CSS Grid is perfect for two-dimensional layouts, while Flexbox excels at one-dimensional arrangements.

## Custom Properties (CSS Variables)

CSS custom properties allow you to store and reuse values throughout your stylesheet, making themes and dynamic styling much easier.

## Container Queries

The latest addition to CSS, container queries allow you to style elements based on their container's size rather than the viewport size.

## Modern Pseudo-selectors

New pseudo-selectors like :has(), :is(), and :where() provide powerful ways to select and style elements with more precision and less specificity conflicts.

These techniques help create more maintainable and flexible stylesheets that adapt to different contexts and requirements.`,
    excerpt: 'Discover modern CSS techniques including Grid, Flexbox, custom properties, and new pseudo-selectors for better UI development.',
    authorId: '2',
    authorName: 'Jane Smith',
    publishedAt: '2024-01-10',
    tags: ['CSS', 'UI/UX', 'Web Development'],
    readTime: 6
  },
  {
    id: '3',
    title: 'TypeScript Best Practices',
    content: `TypeScript has become an essential tool for modern web development. Here are some best practices to help you write better TypeScript code.

## Use Strict Mode

Always enable strict mode in your tsconfig.json to catch more errors at compile time and ensure better type safety.

## Prefer Interfaces for Object Types

When defining object types, prefer interfaces over type aliases as they provide better error messages and can be extended.

## Use Utility Types

TypeScript provides many built-in utility types like Partial, Pick, Omit, and Record that can help you create new types from existing ones.

## Avoid Any

The 'any' type defeats the purpose of TypeScript. Instead, use 'unknown' for truly unknown types or create proper type definitions.

## Use Type Guards

Type guards help narrow down types at runtime, making your code more type-safe and easier to understand.

Following these practices will help you write more maintainable and error-free TypeScript code.`,
    excerpt: 'Learn essential TypeScript best practices for writing maintainable, type-safe code in your projects.',
    authorId: '1',
    authorName: 'John Doe',
    publishedAt: '2024-01-08',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    readTime: 5
  }
];