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
        name: "Sujit Mecwan", // Using current user name
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150"
      }
    };
    setBlogs(prevBlogs => [newBlog, ...prevBlogs]);
    return newBlog;
  };

  const updateBlog = (id, updatedBlog) => {
    setBlogs(prevBlogs => prevBlogs.map(b => b.id === id ? { ...b, ...updatedBlog } : b));
  };

  const deleteBlog = (id) => {
    setBlogs(prevBlogs => prevBlogs.filter(b => b.id !== id));
  };

  return (
    <BlogContext.Provider value={{ blogs, addBlog, updateBlog, deleteBlog }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogs() {
  return useContext(BlogContext);
}
