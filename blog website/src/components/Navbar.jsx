import { Link, NavLink } from 'react-router-dom';
import { PenSquare, User, LogIn, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = true; // For demo purposes, true or false

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-900 tracking-tight">
              Mono<span className="text-gray-400">blog</span>.
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" className={({isActive}) => isActive ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-900 transition"}>Home</NavLink>
            <NavLink to="/categories" className={({isActive}) => isActive ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-900 transition"}>Categories</NavLink>
            <NavLink to="/about" className={({isActive}) => isActive ? "text-gray-900 font-medium" : "text-gray-500 hover:text-gray-900 transition"}>About</NavLink>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/write" className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition">
                  <PenSquare className="w-4 h-4 mr-2" />
                  Write
                </Link>
                <Link to="/dashboard" className="flex items-center bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </>
            ) : (
              <Link to="/login" className="flex items-center bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition">
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-900 focus:outline-none">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full">
          <div className="px-4 pt-2 pb-4 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50" onClick={() => setIsOpen(false)}>Categories</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50" onClick={() => setIsOpen(false)}>About</Link>
            
            <div className="border-t border-gray-100 pt-4 mt-2">
              {isAuthenticated ? (
                <>
                  <Link to="/write" className="flex items-center px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900" onClick={() => setIsOpen(false)}>
                    <PenSquare className="w-5 h-5 mr-3" />
                    Write a Post
                  </Link>
                  <Link to="/dashboard" className="flex items-center px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900" onClick={() => setIsOpen(false)}>
                    <User className="w-5 h-5 mr-3" />
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link to="/login" className="flex items-center px-3 py-2 text-base font-medium text-gray-500 hover:text-gray-900" onClick={() => setIsOpen(false)}>
                  <LogIn className="w-5 h-5 mr-3" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
