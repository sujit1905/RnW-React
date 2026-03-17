import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ChevronLeft, Heart, Share2, MoreHorizontal } from 'lucide-react';
import { useBlogs } from '../context/BlogContext';
import BlogCard from '../components/BlogCard';

export default function BlogDetail() {
  const { id } = useParams();
  const { blogs } = useBlogs();
  const blog = blogs.find(b => b.id === parseInt(id));

  if (!blog) return <div className="min-h-screen py-32 text-center text-2xl font-bold text-gray-500">Blog not found</div>;

  const date = new Date(blog.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const relatedBlogs = blogs.filter(b => b.id !== blog.id).slice(0, 3);

  return (
    <article className="bg-white min-h-screen">
      {/* Article Header */}
      <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-gray-900 mb-10 transition-colors">
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to feed
        </Link>
        
        <div className="flex items-center gap-x-4 mb-8">
          <span className="rounded-full bg-gray-50 px-4 py-1.5 font-semibold text-gray-700 text-sm border border-gray-100">
            {blog.category}
          </span>
          <div className="flex items-center text-sm text-gray-400 font-medium">
            <time dateTime={blog.publishedAt}>{date}</time>
            <span className="mx-2">&middot;</span>
            <span>{blog.readTime}</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-10 leading-tight">
          {blog.title}
        </h1>

        <div className="flex items-center justify-between border-y border-gray-100 py-6 mb-12">
          <div className="flex items-center gap-x-4">
            <img src={blog.author.avatar} alt="" className="h-12 w-12 rounded-full ring-2 ring-gray-50 shadow-sm" />
            <div className="text-sm leading-6">
              <p className="font-bold text-gray-900">{blog.author.name}</p>
              <p className="text-gray-500">Editor</p>
            </div>
          </div>
          <div className="flex items-center gap-x-4 text-gray-400">
            <button className="hover:text-red-500 transition-colors"><Heart className="w-5 h-5" /></button>
            <button className="hover:text-blue-500 transition-colors"><Share2 className="w-5 h-5" /></button>
            <button className="hover:text-gray-900 transition-colors"><MoreHorizontal className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-gray-200/50">
          <img
            src={blog.coverImage}
            alt={blog.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-gray-900 hover:prose-a:text-gray-600 prose-img:rounded-2xl">
          <p className="lead text-xl text-gray-600 mb-8 font-medium italic">
            {blog.excerpt}
          </p>
          <div className="text-gray-800 leading-relaxed font-serif text-lg space-y-8">
            <p className="whitespace-pre-line">{blog.content}</p>
          </div>
        </div>
      </header>

      {/* Suggested Reading */}
      <section className="border-t border-gray-100 bg-gray-50/50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-12 flex items-center gap-3">
             <span className="w-8 h-px bg-gray-900"></span>
             Keep Reading
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedBlogs.map((b) => (
              <BlogCard key={b.id} blog={b} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
