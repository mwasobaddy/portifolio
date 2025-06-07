import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import profileImage_NAV from '../../assets/images/profile.jpg'; // Import the profile image

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isHomePage = location.pathname === '/';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${(scrolled || !isHomePage) ? 'bg-white shadow-md' : 'bg-transparent'} ${scrolled ? 'py-3' : 'py-5'}`}>
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className={`text-2xl font-bold text-primary`}>ObaDevOps</span> {/* Simplified: Logo always text-primary. Relies on bg logic. */}
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6 items-center">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            const hasWhiteBg = scrolled || !isHomePage;
            let linkClasses = 'font-medium transition-colors transition-transform duration-300 transform pb-1 hover:-translate-y-0.5';

            if (isActive) {
              linkClasses += ' border-b-2 border-primary';
              if (hasWhiteBg) {
                linkClasses += ' text-dark'; // Active on white bg - hover:text-primary is part of base
              } else {
                linkClasses += ' text-primary'; // Active on transparent (home) - hover:text-primary is part of base
              }
            } else {
              if (hasWhiteBg) {
                linkClasses += ' text-dark hover:text-primary'; // Inactive on white bg
              } else {
                // Inactive on transparent (home)
                linkClasses += ' text-dark hover:text-primary';
              }
            }

            return (
              <Link
                key={link.name}
                to={link.path}
                className={linkClasses}
              >
                {link.name}
              </Link>
            );
          })}
          <a 
            href="#" 
            className="btn-primary"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white"
          >
            <div className="flex flex-col items-center space-y-4 py-6 px-4 shadow-md">
              <div className="overflow-hidden rounded-full mb-4 border-4 border-white shadow-lg" style={{ width: '120px', height: '120px' }}>
                <img 
                  src={profileImage_NAV}
                  alt="Kelvin Mwangi" 
                  className="w-full h-full object-cover"
                  onError={(e) => { 
                    e.target.onerror = null; 
                    e.target.src = 'https://via.placeholder.com/120?text=KM'; 
                  }}
                />
              </div>
              <h3 className="text-xl font-bold">Kelvin Mwangi</h3> {/* Added font-bold */}
              <p className="text-sm text-gray-700 mb-2">Full Stack Developer</p> {/* Changed text-gray-600 to text-gray-700 */}
              
              <div className="w-full border-t border-gray-200 my-2"></div>
              
              {navLinks.map((link) => (
                <Link 
                  key={link.name}
                  to={link.path}
                  className={`w-full text-center py-2 rounded-md transition-all duration-300 ${location.pathname === link.path ? 'text-primary font-semibold bg-primary/10' : 'text-dark hover:text-primary hover:bg-gray-100'}`}
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href="#" 
                className="btn-primary w-full text-center mt-4"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;