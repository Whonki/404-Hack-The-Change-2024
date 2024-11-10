import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  updateDoc, 
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getFirestore();

  // State management
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userCases, setUserCases] = useState([]);
  const [editForm, setEditForm] = useState({
    displayName: '',
    title: '',
    bio: '',
    location: '',
    specializations: '',
    contactEmail: '',
    phoneNumber: '',
    yearsOfExperience: '',
    education: '',
    languages: '',
  });

  // Fetch user profile data
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await fetchUserProfile(user.uid);
        await fetchUserCases(user.uid);
      } else {
        navigate('/login');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const fetchUserProfile = async (uid) => {
    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const profileData = docSnap.data();
        setProfile(profileData);
        setEditForm(profileData);
      } else {
        // Create default profile if it doesn't exist
        const defaultProfile = {
          displayName: user.displayName || '',
          title: '',
          bio: '',
          location: '',
          specializations: '',
          contactEmail: user.email || '',
          phoneNumber: '',
          yearsOfExperience: '',
          education: '',
          languages: '',
          createdAt: new Date().toISOString(),
        };
        setProfile(defaultProfile);
        setEditForm(defaultProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchUserCases = async (uid) => {
    try {
      const casesRef = collection(db, 'cases');
      const q = query(casesRef, where('attorneyId', '==', uid));
      const querySnapshot = await getDocs(q);
      const cases = [];
      querySnapshot.forEach((doc) => {
        cases.push({ id: doc.id, ...doc.data() });
      });
      setUserCases(cases);
    } catch (error) {
      console.error('Error fetching cases:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        ...editForm,
        updatedAt: new Date().toISOString()
      });
      setProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info">
          <div className="profile-avatar">
            <img 
              src={user?.photoURL || '/api/placeholder/150/150'} 
              alt="Profile" 
            />
          </div>
          <div className="profile-title">
            <h1>{profile?.displayName}</h1>
            <p>{profile?.title}</p>
          </div>
          {!isEditing && (
            <button 
              className="edit-button"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="profile-content">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="edit-form">
            <div className="form-group">
              <label>Display Name</label>
              <input
                type="text"
                name="displayName"
                value={editForm.displayName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={editForm.title}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={editForm.bio}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={editForm.location}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Specializations</label>
              <input
                type="text"
                name="specializations"
                value={editForm.specializations}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={editForm.contactEmail}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={editForm.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Years of Experience</label>
              <input
                type="number"
                name="yearsOfExperience"
                value={editForm.yearsOfExperience}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Education</label>
              <textarea
                name="education"
                value={editForm.education}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Languages</label>
              <input
                type="text"
                name="languages"
                value={editForm.languages}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-button">Save Changes</button>
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => {
                  setIsEditing(false);
                  setEditForm(profile);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-details">
            <div className="detail-section">
              <h2>About</h2>
              <p>{profile?.bio}</p>
            </div>

            <div className="detail-section">
              <h2>Professional Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Location</span>
                  <span className="value">{profile?.location}</span>
                </div>
                <div className="info-item">
                  <span className="label">Specializations</span>
                  <span className="value">{profile?.specializations}</span>
                </div>
                <div className="info-item">
                  <span className="label">Years of Experience</span>
                  <span className="value">{profile?.yearsOfExperience}</span>
                </div>
                <div className="info-item">
                  <span className="label">Languages</span>
                  <span className="value">{profile?.languages}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Education</h2>
              <p>{profile?.education}</p>
            </div>

            <div className="detail-section">
              <h2>Contact Information</h2>
              <div className="info-grid">
                <div className="info-item">
                  <span className="label">Email</span>
                  <span className="value">{profile?.contactEmail}</span>
                </div>
                <div className="info-item">
                  <span className="label">Phone</span>
                  <span className="value">{profile?.phoneNumber}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h2>Active Cases ({userCases.length})</h2>
              <div className="cases-grid">
                {userCases.map(case_ => (
                  <div key={case_.id} className="case-card">
                    <h3>{case_.subject}</h3>
                    <p>Status: {case_.status}</p>
                    <p>Posted: {new Date(case_.timePosted).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .profile-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .profile-header {
          position: relative;
          margin-bottom: 30px;
        }

        .profile-cover {
          height: 200px;
          background: linear-gradient(to right, #2563eb, #1d4ed8);
          border-radius: 12px;
        }

        .profile-info {
          display: flex;
          align-items: flex-end;
          padding: 0 20px;
          margin-top: -60px;
        }

        .profile-avatar {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          border: 4px solid white;
          overflow: hidden;
          background: white;
        }

        .profile-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .profile-title {
          margin-left: 20px;
          flex-grow: 1;
        }

        .profile-title h1 {
          font-size: 2rem;
          margin: 0;
          color: #1a1a1a;
        }

        .profile-title p {
          margin: 5px 0;
          color: #666;
        }

        .edit-button {
          padding: 8px 16px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .edit-button:hover {
          background: #1d4ed8;
        }

        .profile-content {
          background: white;
          border-radius: 12px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .detail-section {
          margin-bottom: 30px;
        }

        .detail-section h2 {
          color: #1a1a1a;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #eef2f6;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
        }

        .info-item {
          display: flex;
          flex-direction: column;
        }

        .info-item .label {
          font-size: 0.9rem;
          color: #666;
          margin-bottom: 5px;
        }

        .info-item .value {
          font-size: 1.1rem;
          color: #1a1a1a;
        }

        .edit-form {
          display: grid;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-weight: 500;
          color: #374151;
        }

        .form-group input,
        .form-group textarea {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          font-size: 1rem;
        }

        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }

        .form-buttons {
          display: flex;
          gap: 10px;
          justify-content: flex-end;
          margin-top: 20px;
        }

        .save-button,
        .cancel-button {
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s;
        }

        .save-button {
          background: #2563eb;
          color: white;
          border: none;
        }

        .cancel-button {
          background: #f3f4f6;
          color: #4b5563;
          border: 1px solid #d1d5db;
        }

        .cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .case-card {
          padding: 20px;
          border: 1px solid #eef2f6;
          border-radius: 8px;
          background: #f8f9fa;
        }

        .case-card h3 {
          margin: 0 0 10px 0;
          color: #1a1a1a;
        }

        .case-card p {
          margin: 5px 0;
          color: #666;
        }

        .loading {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 300px;
          font-size: 1.2rem;
          color: #666;
        }

        @media (max-width: 768px) {
          .profile-info {
            flex-direction: column;
            align-items: center;
            text-align: center;
          }

          .profile-title {
            margin: 15px 0;
          }

          .info-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Profile;