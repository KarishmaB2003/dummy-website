import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, Coffee, Globe, MessageCircle, Share2, Mail } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Reports', path: '/reports' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Coffee className="h-8 w-8 text-accent" />
              <span className="text-xl font-display font-bold tracking-tight text-gray-900 dark:text-white">
                Urban<span className="text-accent">Brew</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-accent ${
                  location.pathname === link.path 
                    ? 'text-accent' 
                    : 'text-gray-600 dark:text-zinc-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              {isDarkMode ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-600" />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-gray-600 dark:text-zinc-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden glass border-b dark:border-zinc-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'bg-accent/10 text-accent'
                    : 'text-gray-600 dark:text-zinc-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-50 dark:bg-zinc-950 border-t dark:border-zinc-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center space-x-2">
              <Coffee className="h-8 w-8 text-accent" />
              <span className="text-xl font-display font-bold tracking-tight dark:text-white">
                Urban<span className="text-accent">Brew</span>
              </span>
            </Link>
            <p className="mt-4 text-gray-500 dark:text-zinc-400 max-w-xs">
              Crafting premium coffee experiences since 2026. Join us for the finest beans and artisanal pastries.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-gray-500 dark:text-zinc-400 hover:text-accent">Home</Link></li>
              <li><Link to="/reports" className="text-gray-500 dark:text-zinc-400 hover:text-accent">Reports</Link></li>
              <li><Link to="/about" className="text-gray-500 dark:text-zinc-400 hover:text-accent">About</Link></li>
              <li><Link to="/contact" className="text-gray-500 dark:text-zinc-400 hover:text-accent">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Social</h3>
            <div className="mt-4 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Globe className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><MessageCircle className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Share2 className="h-6 w-6" /></a>
              <a href="#" className="text-gray-400 hover:text-accent transition-colors"><Mail className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t dark:border-zinc-800 pt-8 flex items-center justify-between">
          <p className="text-base text-gray-400">&copy; 2026 Urban Brew Café. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
