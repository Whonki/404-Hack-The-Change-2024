import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="logo">
            <div className="logo-circle">L</div>
            <span className="brand-name">Logo</span>
          </Link>

          <button 
            className="mobile-menu-button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        <div className={`nav-links ${isOpen ? 'show' : ''}`}>
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-link ${isActivePath(item.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <button className="sign-in-button">Sign In</button>
        </div>
      </nav>

      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .navbar {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          height: 70px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .navbar-brand {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #333;
          gap: 10px;
        }

        .logo-circle {
          width: 35px;
          height: 35px;
          background: #2563eb;
          color: white;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 1.2rem;
        }

        .brand-name {
          font-size: 1.2rem;
          font-weight: 600;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .nav-link {
          text-decoration: none;
          color: #4b5563;
          padding: 8px 12px;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .nav-link:hover {
          background: #eff6ff;
          color: #2563eb;
        }

        .nav-link.active {
          background: #2563eb;
          color: white;
        }

        .sign-in-button {
          margin-left: 8px;
          padding: 8px 16px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .sign-in-button:hover {
          background: #1d4ed8;
        }

        .mobile-menu-button {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
        }

        .hamburger {
          display: block;
          width: 24px;
          height: 2px;
          background: #4b5563;
          position: relative;
          transition: all 0.3s ease;
        }

        .hamburger::before,
        .hamburger::after {
          content: '';
          position: absolute;
          width: 24px;
          height: 2px;
          background: #4b5563;
          transition: all 0.3s ease;
        }

        .hamburger::before {
          top: -8px;
        }

        .hamburger::after {
          bottom: -8px;
        }

        .hamburger.open {
          transform: rotate(45deg);
        }

        .hamburger.open::before {
          transform: rotate(90deg);
          top: 0;
        }

        .hamburger.open::after {
          transform: rotate(90deg);
          bottom: 0;
        }

        @media (max-width: 768px) {
          .mobile-menu-button {
            display: block;
          }

          .navbar-brand {
            width: auto;
          }

          .nav-links {
            position: absolute;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 20px;
            gap: 10px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            display: none;
          }

          .nav-links.show {
            display: flex;
          }

          .nav-link {
            width: 100%;
            text-align: center;
          }

          .sign-in-button {
            width: 100%;
            margin: 8px 0;
          }
        }
      `}</style>
    </div>
  );
};

export default NavBar;