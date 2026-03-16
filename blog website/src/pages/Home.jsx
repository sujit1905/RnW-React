import { useState } from 'react';
import { categories } from '../data/dummyData';
import { useBlogs } from '../context/BlogContext';
import FeaturedPost from '../components/FeaturedPost';
import BlogCard from '../components/BlogCard';
import CategoryTag from '../components/CategoryTag';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const { blogs } = useBlogs();

  const featuredBlog = blogs.length > 0 ? blogs[0] : null;
  const remainingBlogs = activeCategory === 'All' 
    ? blogs.slice(1) 
    : blogs.filter(b => b.category === activeCategory);

  return (
    <div className="bg-white/50 min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Header Section */}
        <div className="text-center md:text-left flex flex-col items-center mb-20 gap-8">
          <div className="max-w-2xl text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tighter mb-6 relative inline-block">
              Writers <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-800">Unleashed</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium leading-relaxed max-w-xl mx-auto">
              A curated space for thinkers, makers, and creators to share their stories with the world.
            </p>
          </div>
        </div>

        {/* Featured Post */}
        {activeCategory === 'All' && featuredBlog && (
          <div className="mb-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 flex items-center gap-3">
              <span className="w-8 h-px bg-gray-900"></span>
              Featured Story
            </h2>
            <FeaturedPost blog={featuredBlog} />
          </div>
        )}

        {/* Categories */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              <span className="w-8 h-px bg-gray-900"></span>
              Latest Highlights
            </h2>
          </div>
          
          <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide snap-x">
            <CategoryTag 
              category="All" 
              isActive={activeCategory === 'All'} 
              onClick={setActiveCategory} 
            />
            {categories.map((cat) => (
              <div key={cat} className="snap-start shrink-0">
                <CategoryTag
                  category={cat}
                  isActive={activeCategory === cat}
                  onClick={setActiveCategory}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {remainingBlogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>

        {/* Load More Button */}
        {remainingBlogs.length > 0 && (
          <div className="mt-20 flex justify-center">
            <button className="px-8 py-3.5 border-2 border-gray-900 text-gray-900 rounded-full font-bold hover:bg-gray-900 hover:text-white transition-all duration-300 shadow-[4px_4px_0px_#111827] hover:shadow-[0px_0px_0px_#111827] hover:translate-x-1 hover:translate-y-1">
              Load more stories
            </button>
          </div>
        )}

        {remainingBlogs.length === 0 && (
          <div className="text-center py-24 text-gray-500 text-lg">
            No posts found in this category.
          </div>
        )}
      </main>
    </div>
  );
}
