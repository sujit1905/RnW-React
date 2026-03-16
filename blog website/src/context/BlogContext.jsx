import { createContext, useState, useContext } from 'react';
import { blogs as initialBlogs } from '../data/dummyData';

const BlogContext = createContext();

export function BlogProvider({ children }) {
  const [blogs, setBlogs] = useState(initialBlogs);

  const addBlog = (blog) => {
    // Basic validation / default values
    const newBlog = {
      ...blog,
      id: Date.now(),
      publishedAt: new Date().toISOString(),
      readTime: Math.max(1, Math.ceil(blog.content.length / 1000)) + " min read",
      author: {
        name: "John Doe", // Using current user name
        avatar: "https://i.pravatar.cc/150?u=john"
      }
    };

    setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
    return newBlog;
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogs() {
  return useContext(BlogContext);
}
