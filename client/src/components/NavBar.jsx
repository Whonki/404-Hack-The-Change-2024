import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import { db, auth } from "../firebase";
import './NavBar.css'
import { 
  signOut, 
  onAuthStateChanged, 
  signInWithPopup, 
  GoogleAuthProvider, 
} from 'firebase/auth';
import { 
  doc, 
  getDoc,
  setDoc,
} from 'firebase/firestore';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUserTypeModal, setShowUserTypeModal] = useState(false);
  const [userType, setUserType] = useState(null); // 'lawyer' or 'client' or null
  const location = useLocation();
  const navigate = useNavigate();
  
  const provider = new GoogleAuthProvider();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        // Check user type
        const lawyerDoc = await getDoc(doc(db, 'Lawyers', currentUser.uid));
        const clientDoc = await getDoc(doc(db, 'Clients', currentUser.uid));
        
        if (lawyerDoc.exists()) {
          setUserType('lawyer');
        } else if (clientDoc.exists()) {
          setUserType('client');
        } else {
          setUserType(null);
        }
      } else {
        setUserType(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Define navigation items based on user type
  const getNavigation = () => {
    const defaultNav = [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
      { name: 'Contact', path: '/contact' },
    ];

    if (!user) {
      return defaultNav;
    }

    if (userType === 'lawyer') {
      return [
        ...defaultNav,
        { name: 'Cases', path: '/cases' },
        { name: 'Profile', path: '/profile' },
      ];
    }

    if (userType === 'client') {
      return [
        ...defaultNav,
        { name: 'Post Case', path: '/post-case' },
        { name: 'Profile', path: '/profile' },
      ];
    }

    return defaultNav;
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUserType(null);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const checkUserExists = async (userId) => {
    try {
      const lawyerDoc = await getDoc(doc(db, 'Lawyers', userId));
      const clientDoc = await getDoc(doc(db, 'Clients', userId));
      
      return lawyerDoc.exists() || clientDoc.exists();
    } catch (error) {
      console.error('Error checking user existence:', error);
      return false;
    }
  };

  const handleUserType = async (isLawyer) => {
    if (!user) return;

    try {
      const collection = isLawyer ? "Lawyers" : "Clients";
      await setDoc(doc(db, collection, user.uid), {
        Email: user.email,
        Name: user.displayName,
        ProfilePic: user.photoURL,
        CreatedAt: new Date().toISOString(),
      });

      setShowUserTypeModal(false);
      setUserType(isLawyer ? 'lawyer' : 'client');
      alert(`Welcome ${isLawyer ? 'Lawyer' : 'User'} ${user.displayName}!`);
    } catch (error) {
      console.error('Error saving user type:', error);
      alert('Error saving user type. Please try again.');
    }
  };

  const handleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userExists = await checkUserExists(result.user.uid);
      
      if (!userExists) {
        setShowUserTypeModal(true);
      } else {
        // Check user type
        const lawyerDoc = await getDoc(doc(db, 'Lawyers', result.user.uid));
        if (lawyerDoc.exists()) {
          setUserType('lawyer');
        } else {
          setUserType('client');
        }
      }
    } catch (error) {
      console.error('Error signing in:', error);
      alert('Error signing in. Please try again.');
    }
  };

  return (
    <>
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
            {getNavigation().map((item) => (
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
                  {userType && (
                    <Link to="/profile" className="profile-button">
                      <User size={18} />
                      <span>{user.displayName || 'Profile'}</span>
                    </Link>
                  )}
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

          {showUserTypeModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2 className="modal-title">Are you a lawyer?</h2>
                <div className="modal-buttons">
                  <button
                    className="modal-button lawyer"
                    onClick={() => handleUserType(true)}
                  >
                    Yes, I'm a lawyer
                  </button>
                  <button
                    className="modal-button client"
                    onClick={() => handleUserType(false)}
                  >
                    No, I'm not
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;