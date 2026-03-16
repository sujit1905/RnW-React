import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';

export default function FeaturedPost({ blog }) {
  const date = new Date(blog.publishedAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <article className="group relative isolate flex flex-col gap-8 lg:flex-row mb-16 max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 items-stretch">
      <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-[65%] lg:shrink-0 h-full overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="flex flex-col justify-center p-8 lg:px-12 lg:py-16 bg-white w-full lg:-ml-12 lg:z-10 lg:my-8 lg:rounded-l-3xl shadow-[-10px_0_30px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-x-4 text-xs">
          <time dateTime={blog.publishedAt} className="text-gray-500 flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4" />
            {date}
          </time>
          <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 border border-gray-100 transition-colors cursor-pointer">
            {blog.category}
          </span>
          <span className="text-gray-500 flex items-center gap-1.5 font-medium ml-auto">
            <Clock className="w-4 h-4" />
            {blog.readTime}
          </span>
        </div>
        <div className="group relative max-w-xl">
          <h3 className="mt-8 text-3xl sm:text-4xl font-extrabold leading-tight text-gray-900 tracking-tight group-hover:text-gray-600 transition-colors">
            <Link to={`/blog/${blog.id}`}>
              <span className="absolute inset-0" />
              {blog.title}
            </Link>
          </h3>
          <p className="mt-6 leading-relaxed text-gray-500 text-lg">
            {blog.excerpt}
          </p>
        </div>
        <div className="mt-10 flex border-t border-gray-100 pt-8">
          <div className="relative flex items-center gap-x-4">
            <img src={blog.author.avatar} alt="" className="h-12 w-12 rounded-full bg-gray-50 object-cover ring-4 ring-white shadow-md shadow-gray-200" />
            <div className="text-sm leading-6">
              <p className="font-bold text-gray-900">
                <Link to="#" className="relative z-10 hover:text-gray-600 transition-colors">
                  {blog.author.name}
                </Link>
              </p>
              <p className="text-gray-500 mt-0.5">Editor in Chief</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
