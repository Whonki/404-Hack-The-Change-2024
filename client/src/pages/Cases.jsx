import React, { useState } from 'react';
import Post from '../components/Post';

const Cases = () => {
  // Sample data - replace with your actual data source
  const initialCases = [
    {
      username: "JohnDoe",
      timePosted: "2024-03-15 14:30",
      subject: "Contract Dispute Resolution",
      tags: ["Contract Law", "Business", "Urgent"],
      location: "New York, NY",
      language: "English",
      details: "Seeking legal counsel for a complex contract dispute between two technology companies...",
      status: "Open"
    },
    {
      username: "JaneSmith",
      timePosted: "2024-03-14 09:15",
      subject: "Intellectual Property Rights",
      tags: ["IP Law", "Patents", "Technology"],
      location: "San Francisco, CA",
      language: "English",
      details: "Need assistance with patent filing and IP protection strategy...",
      status: "Open"
    }
  ];

  const [cases, setCases] = useState(initialCases);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  // Get unique tags from all cases
  const allTags = [...new Set(cases.flatMap(c => c.tags))];

  const filteredCases = cases.filter(caseItem => {
    const matchesSearch = caseItem.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseItem.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || caseItem.status === filterStatus;
    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.every(tag => caseItem.tags.includes(tag));
    
    return matchesSearch && matchesStatus && matchesTags;
  });

  return (
    <div className="cases-page">
      {/* Header Section */}
      <header className="cases-header">
        <h1>Legal Cases Dashboard</h1>
        <p>{filteredCases.length} cases found</p>
      </header>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search cases..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-options">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>

          <div className="tags-filter">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag-btn ${selectedTags.includes(tag) ? 'active' : ''}`}
                onClick={() => {
                  setSelectedTags(prev => 
                    prev.includes(tag) 
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Cases Feed */}
      <div className="cases-feed">
        {filteredCases.map((caseItem, index) => (
          <Post key={index} {...caseItem} />
        ))}
      </div>

      <style>{`
        .cases-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .cases-header {
          margin-bottom: 30px;
          border-bottom: 2px solid #eef2f6;
          padding-bottom: 20px;
        }

        .cases-header h1 {
          font-size: 2rem;
          color: #1a1a1a;
          margin-bottom: 10px;
        }

        .cases-header p {
          color: #666;
          font-size: 1.1rem;
        }

        .filters-section {
          margin-bottom: 30px;
          padding: 20px;
          background: #f8f9fa;
          border-radius: 8px;
        }

        .search-bar {
          margin-bottom: 20px;
        }

        .search-bar input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
        }

        .filter-options {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          align-items: center;
        }

        .filter-options select {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 1rem;
          background: white;
        }

        .tags-filter {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .tag-btn {
          padding: 6px 12px;
          border: 1px solid #ddd;
          border-radius: 20px;
          background: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .tag-btn.active {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
        }

        .cases-feed {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Styling for the Post component */
        .post {
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          transition: all 0.2s ease;
        }

        .post:hover {
          box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }

        .post-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          padding-bottom: 15px;
          border-bottom: 1px solid #eef2f6;
        }

        .post-tags {
          margin: 10px 0;
        }

        .expand-btn {
          color: #2563eb;
          cursor: pointer;
          margin: 10px 0;
          font-weight: 500;
        }

        .post-details {
          margin-top: 15px;
          padding-top: 15px;
          border-top: 1px solid #eef2f6;
        }

        .action-buttons {
          display: flex;
          gap: 10px;
          margin-top: 15px;
        }

        .action-buttons button {
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .ignore-btn {
          background: #ef4444;
          color: white;
        }

        .chat-btn {
          background: #2563eb;
          color: white;
        }

        .collapse-btn {
          background: #f3f4f6;
          color: #4b5563;
        }

        .action-buttons button:hover {
          opacity: 0.9;
        }

        @media (max-width: 768px) {
          .cases-page {
            padding: 10px;
          }

          .filter-options {
            flex-direction: column;
            align-items: stretch;
          }

          .post-header {
            flex-direction: column;
            gap: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default Cases;