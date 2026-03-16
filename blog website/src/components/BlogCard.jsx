import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

export default function BlogCard({ blog }) {
  const date = new Date(blog.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="group relative flex flex-col items-start justify-between bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full">
      <div className="relative w-full rounded-xl overflow-hidden mb-6 aspect-[16/10]">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-gray-900 border border-white/20 shadow-sm">
            {blog.category}
          </span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-between w-full h-full">
        <div>
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <time dateTime={blog.publishedAt} className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {date}
            </time>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {blog.readTime}
            </span>
          </div>

          <h3 className="mt-2 text-xl font-bold leading-snug text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2">
            <Link to={`/blog/${blog.id}`}>
              <span className="absolute inset-0" />
              {blog.title}
            </Link>
          </h3>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-gray-500">
            {blog.excerpt}
          </p>
        </div>

        <div className="relative mt-8 flex items-center gap-x-4 border-t border-gray-50 pt-6">
          <img src={blog.author.avatar} alt="" className="h-10 w-10 rounded-full bg-gray-50 object-cover ring-2 ring-white shadow-sm" />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
              <Link to="#" className="relative z-10 hover:text-gray-600 transition-colors">
                {blog.author.name}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
