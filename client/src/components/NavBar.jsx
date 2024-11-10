// NavBar.jsx
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { db, auth } from "../firebase";
import { signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import './NavBar.css';

const provider = new GoogleAuthProvider();

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Cases', path: '/cases' },
    { name: 'Contact', path: '/contact' },
    { name: 'Profile', path: '/profile' },
  ];

  const isActivePath = (path) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error('Error signing in:', error);
    });
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/" className="logo">
            <div className="logo-circle">LE</div>
            <span className="brand-name">LegalEase</span>
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
          
          {!loading && (
            user ? (
              <div className="auth-buttons">
                <Link to="/profile" className="profile-button">
                  <User size={18} />
                  <span>{user.displayName || 'Profile'}</span>
                </Link>
                <button onClick={handleSignOut} className="sign-out-button">
                  <LogOut size={18} />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button onClick={handleSignIn} className="sign-in-button">
                Sign In
              </button>
            )
          )}
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
