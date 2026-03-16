import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 mt-24 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">
              Mono<span className="text-gray-400">blog</span>.
            </Link>
          </div>
          <div className="mt-8 flex justify-center space-x-6 md:mt-0">
            <Link to="#" className="text-gray-400 hover:text-gray-900 transition text-sm">
              Twitter
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-900 transition text-sm">
              GitHub
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-900 transition text-sm">
              Dribbble
            </Link>
            <Link to="#" className="text-gray-400 hover:text-gray-900 transition text-sm">
              RSS
            </Link>
          </div>
        </div>
        <div className="mt-8 md:mt-12">
          <p className="text-center text-sm text-gray-400">
            &copy; 2026 Monoblog, Inc. All rights reserved. Designed with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
