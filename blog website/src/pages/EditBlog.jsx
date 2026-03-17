import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ImagePlus, Type, Hash, Edit3 } from 'lucide-react';
import { categories } from '../data/dummyData';
import { useBlogs } from '../context/BlogContext';

export default function EditBlog() {
  const { id } = useParams();
  const { blogs, updateBlog } = useBlogs();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    coverImage: '',
    content: ''
  });

  useEffect(() => {
    const blogToEdit = blogs.find(b => b.id === parseInt(id));
    if (blogToEdit) {
      setFormData({
        title: blogToEdit.title,
        category: blogToEdit.category,
        coverImage: blogToEdit.coverImage,
        content: blogToEdit.content
      });
    }
  }, [id, blogs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBlog(parseInt(id), formData);
    navigate(`/blog/${id}`);
  };

  return (
    <div className="bg-white/50 min-h-screen py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight mb-4 text-center">
          Edit Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-800">Masterpiece</span>
        </h1>
        <p className="text-center md:text-lg text-gray-500 mb-16 max-w-xl mx-auto font-medium">
          Make changes to your story and update the world with your latest ideas.
        </p>

        <form onSubmit={handleSubmit} className="space-y-10 group">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-10">
            {/* Title Input */}
            <div className="relative">
              <label htmlFor="title" className="block text-sm font-bold leading-6 text-gray-900 mb-2 uppercase tracking-wide">
                Title
              </label>
              <div className="relative flex items-center">
                <div className="absolute left-4 z-10 text-gray-400"><Type className="w-5 h-5"/></div>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="block w-full rounded-2xl border-0 py-4 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-lg font-medium transition-shadow hover:ring-gray-300"
                  placeholder="Enter a captivating title..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* Category Selection */}
               <div className="relative">
                 <label htmlFor="category" className="block text-sm font-bold leading-6 text-gray-900 mb-2 uppercase tracking-wide">
                   Category
                 </label>
                 <div className="relative flex items-center">
                    <div className="absolute left-4 z-10 text-gray-400 pointer-events-none"><Hash className="w-5 h-5"/></div>
                    <select
                      id="category"
                      name="category"
                      className="block w-full rounded-2xl border-0 py-4 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-base font-medium transition-shadow hover:ring-gray-300 appearance-none bg-white"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                    >
                      <option value="" disabled>Select a category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                 </div>
               </div>

               {/* Cover Image URL */}
               <div className="relative">
                 <label htmlFor="coverImage" className="block text-sm font-bold leading-6 text-gray-900 mb-2 uppercase tracking-wide">
                   Cover Image URL
                 </label>
                 <div className="relative flex items-center">
                    <div className="absolute left-4 z-10 text-gray-400"><ImagePlus className="w-5 h-5"/></div>
                    <input
                      type="url"
                      name="coverImage"
                      id="coverImage"
                      className="block w-full rounded-2xl border-0 py-4 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-base font-medium transition-shadow hover:ring-gray-300"
                      placeholder="https://example.com/image.jpg"
                      value={formData.coverImage}
                      onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                      required
                    />
                 </div>
               </div>
            </div>

            {/* Content Editor Area */}
            <div className="relative">
              <label htmlFor="content" className="block text-sm font-bold leading-6 text-gray-900 mb-2 uppercase tracking-wide flex items-center gap-2">
                Content
              </label>
              <div className="relative">
                 <div className="absolute top-4 left-4 z-10 text-gray-400"><Edit3 className="w-5 h-5"/></div>
                 <textarea
                   id="content"
                   name="content"
                   rows={12}
                   className="block w-full rounded-2xl border-0 py-4 pl-12 pr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-900 sm:text-lg font-medium resize-y transition-shadow hover:ring-gray-300 font-serif leading-relaxed"
                   placeholder="Start writing your story here..."
                   value={formData.content}
                   onChange={(e) => setFormData({...formData, content: e.target.value})}
                   required
                 />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-x-6 px-4">
            <button type="button" onClick={() => navigate(-1)} className="text-sm font-bold leading-6 text-gray-500 hover:text-gray-900 transition-colors uppercase tracking-wider">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-gray-900 px-8 py-4 text-sm font-bold text-white shadow-xl shadow-gray-900/20 hover:bg-gray-800 hover:shadow-gray-900/30 hover:-translate-y-0.5 transition-all duration-300 uppercase tracking-widest focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
            >
              Update Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
