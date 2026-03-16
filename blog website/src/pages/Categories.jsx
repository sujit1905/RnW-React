import { useState } from 'react';
import { categories } from '../data/dummyData';
import CategoryTag from '../components/CategoryTag';
import BlogCard from '../components/BlogCard';
import { useBlogs } from '../context/BlogContext';

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { blogs } = useBlogs();
  
  const categoryBlogs = activeCategory === 'All'
    ? blogs
    : blogs.filter(b => b.category === activeCategory);

  return (
    <div className="bg-white/50 min-h-[80vh] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-6">
            Explore Topics
          </h1>
          <p className="text-xl text-gray-500 font-medium leading-relaxed">
            Dive into our curated collections of stories, thoughts, and ideas across various disciplines.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <CategoryTag
            category="All"
            isActive={activeCategory === 'All'}
            onClick={setActiveCategory}
          />
          {categories.map((cat) => (
            <CategoryTag
              key={cat}
              category={cat}
              isActive={activeCategory === cat}
              onClick={setActiveCategory}
            />
          ))}
        </div>

        <div className="mb-10 text-center md:text-left border-b border-gray-100 pb-4 flex items-center gap-3">
          <span className="w-8 h-px bg-gray-900 hidden md:block"></span>
          <h2 className="text-3xl font-bold text-gray-900">{activeCategory} Stories</h2>
        </div>

        {categoryBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {categoryBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-gray-50/50 rounded-3xl border border-gray-100 border-dashed">
            <h3 className="text-xl font-medium text-gray-900 mb-2">No stories yet</h3>
            <p className="text-gray-500">We're working on bringing you content for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}
