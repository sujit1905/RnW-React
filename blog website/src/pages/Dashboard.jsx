import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit2, Trash2, Plus, FileText, BarChart2, Settings, LogOut } from 'lucide-react';
import { currentUser } from '../data/dummyData';
import { useBlogs } from '../context/BlogContext';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('posts');
  const { blogs } = useBlogs();
  const userBlogs = blogs.filter(b => b.author.name === currentUser.name); 

  return (
    <div className="bg-gray-50/50 min-h-screen py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="bg-white rounded-3xl p-8 mb-10 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center md:items-start gap-8">
           <img src={currentUser.avatar} alt={currentUser.name} className="w-32 h-32 rounded-full ring-4 ring-gray-50 shadow-md object-cover" />
           <div className="flex-1 text-center md:text-left">
             <h1 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">{currentUser.name}</h1>
             <p className="text-gray-500 font-medium mb-4 flex items-center justify-center md:justify-start gap-2">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{currentUser.role}</span>
                {currentUser.email}
             </p>
             <p className="text-gray-600 max-w-2xl text-lg leading-relaxed">{currentUser.bio}</p>
           </div>
           <div className="flex flex-col gap-3 w-full md:w-auto mt-4 md:mt-0">
             <Link to="/write" className="bg-gray-900 text-white px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-center shadow-lg hover:bg-gray-800 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
               <Plus className="w-4 h-4"/> New Story
             </Link>
             <button className="bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest text-center shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
               <Settings className="w-4 h-4"/> Edit Profile
             </button>
           </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          {/* Sidebar */}
          <aside className="md:w-64 shrink-0">
             <nav className="flex md:flex-col gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
                <button 
                  onClick={() => setActiveTab('posts')}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'posts' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <FileText className="w-5 h-5" /> My Stories
                </button>
                <button 
                  onClick={() => setActiveTab('stats')}
                  className={`flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all whitespace-nowrap ${activeTab === 'stats' ? 'bg-gray-900 text-white shadow-md' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <BarChart2 className="w-5 h-5" /> Analytics
                </button>
                <div className="h-px bg-gray-200 my-2 hidden md:block"></div>
                <button className="flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold text-red-600 hover:bg-red-50 transition-all whitespace-nowrap mt-auto">
                  <LogOut className="w-5 h-5" /> Sign Out
                </button>
             </nav>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
             {activeTab === 'posts' && (
               <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                 <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h2 className="text-xl font-bold text-gray-900">Published Stories ({userBlogs.length})</h2>
                 </div>
                 <ul className="divide-y divide-gray-100">
                   {userBlogs.map(blog => (
                     <li key={blog.id} className="p-6 hover:bg-gray-50/50 transition-colors flex flex-col sm:flex-row items-start sm:items-center gap-6 group">
                        <img src={blog.coverImage} className="w-32 h-20 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow" alt="" />
                        <div className="flex-1">
                           <Link to={`/blog/${blog.id}`} className="block">
                             <h3 className="text-lg font-bold text-gray-900 mb-2 truncate pr-4 group-hover:text-gray-600 transition-colors">{blog.title}</h3>
                           </Link>
                           <div className="flex items-center gap-4 text-sm font-medium text-gray-500">
                             <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500"></span> Published</span>
                             <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
                           </div>
                        </div>
                        <div className="flex items-center gap-3 mt-4 sm:mt-0 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 text-gray-400 hover:text-blue-600 bg-white rounded-full shadow-sm ring-1 ring-gray-100 hover:ring-blue-100 transition-all" title="Edit">
                             <Edit2 className="w-4 h-4" />
                           </button>
                           <button className="p-2 text-gray-400 hover:text-red-600 bg-white rounded-full shadow-sm ring-1 ring-gray-100 hover:ring-red-100 transition-all" title="Delete">
                             <Trash2 className="w-4 h-4" />
                           </button>
                        </div>
                     </li>
                   ))}
                 </ul>
               </div>
             )}

             {activeTab === 'stats' && (
                <div className="bg-white rounded-3xl p-10 border border-gray-100 text-center shadow-sm">
                   <div className="w-16 h-16 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <BarChart2 className="w-8 h-8" />
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-2">Analytics Coming Soon</h3>
                   <p className="text-gray-500 max-w-sm mx-auto">We are working on bringing you detailed insights about your stories and audience.</p>
                </div>
             )}
          </div>
        </div>

      </div>
    </div>
  );
}
