import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const linkClasses = (path: string) => {
    return `relative text-white transition-colors duration-200 py-1 ${
      isActive(path)
        ? 'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary'
        : 'hover:text-primary'
    }`;
  };

  const mobileLinkClasses = (path: string) => {
    return `block w-full text-white transition-colors duration-200 py-2 px-4 ${
      isActive(path)
        ? 'text-primary bg-gray-800'
        : 'hover:text-primary hover:bg-gray-800'
    }`;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/75 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-white flex items-center gap-2">
              <img src="Teamify.png" alt="D Logo" className="h-6 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex flex-grow justify-center gap-12">
            <Link to="/" className={linkClasses('/')}>
              Home
            </Link>
            <Link to="/features" className={linkClasses('/features')}>
              Features
            </Link>
            <Link to="/about" className={linkClasses('/about')}>
              About Us
            </Link>
            <Link to="/contact" className={linkClasses('/contact')}>
              Contact Us
            </Link>
          </div>

          {/* Desktop Sign In Button */}
          <div className="hidden md:block">
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-lg bg-primary text-gray-900 hover:bg-gray-100 transition-colors duration-200 ${
                isActive('/login') ? 'bg-gray-100' : ''
              }`}
            >
              Sign In
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-white hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className={mobileLinkClasses('/')}>
              Home
            </Link>
            <Link to="/features" className={mobileLinkClasses('/features')}>
              Features
            </Link>
            <Link to="/about" className={mobileLinkClasses('/about')}>
              About Us
            </Link>
            <Link to="/contact" className={mobileLinkClasses('/contact')}>
              Contact Us
            </Link>
            <Link 
              to="/login" 
              className="block w-full mt-4 px-4 py-2 text-center rounded-lg bg-primary text-gray-900 hover:bg-gray-100 transition-colors duration-200"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}