import React from 'react';
import { Heart, MessageCircle, Share2 } from 'lucide-react';

const Post = ({ 
  title = "Default Title",
  author = "Anonymous",
  date = new Date().toLocaleDateString(),
  content = "Default content goes here",
  tags = ["general"],
  likes = 0,
  comments = 0
}) => {
  const [liked, setLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(likes);

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <article className="post-card">
      <header className="post-header">
        <div className="post-header-content">
          <div className="post-title-container">
            <h2 className="post-title">{title}</h2>
            <p className="post-meta">
              By {author} • {date}
            </p>
          </div>
        </div>
        <div className="post-tags">
          {tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="post-content">
        <p>{content}</p>
      </div>

      <footer className="post-footer">
        <div className="post-actions">
          <button 
            className={`action-button ${liked ? 'liked' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`heart-icon ${liked ? 'heart-filled' : ''}`} />
            <span>{likeCount}</span>
          </button>
          
          <button className="action-button">
            <MessageCircle className="action-icon" />
            <span>{comments}</span>
          </button>
        </div>

        <button className="share-button">
          <Share2 className="action-icon" />
          Share
        </button>
      </footer>

      <style jsx>{`
        .post-card {
          width: 100%;
          max-width: 800px;
          margin: 20px auto;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          background: white;
          overflow: hidden;
        }

        .post-header {
          padding: 20px;
          border-bottom: 1px solid #eee;
        }

        .post-header-content {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
        }

        .post-title-container {
          flex: 1;
        }

        .post-title {
          font-size: 24px;
          font-weight: bold;
          margin: 0 0 8px 0;
          color: #333;
        }

        .post-meta {
          font-size: 14px;
          color: #666;
          margin: 0;
        }

        .post-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .tag {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 16px;
          background: #f0f0f0;
          font-size: 12px;
          color: #666;
          transition: background-color 0.2s;
        }

        .tag:hover {
          background: #e0e0e0;
        }

        .post-content {
          padding: 20px;
          color: #444;
          line-height: 1.6;
        }

        .post-footer {
          padding: 15px 20px;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .post-actions {
          display: flex;
          gap: 16px;
        }

        .action-button {
          background: none;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #666;
          transition: all 0.2s;
          border-radius: 6px;
        }

        .action-button:hover {
          color: #333;
          background: rgba(0, 0, 0, 0.05);
        }

        .action-button.liked {
          color: #e11d48;
        }

        .action-icon {
          width: 16px;
          height: 16px;
        }

        .heart-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.2s;
        }

        .heart-icon.heart-filled {
          fill: currentColor;
          transform: scale(1.1);
        }

        .share-button {
          background: none;
          border: none;
          padding: 8px 12px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #666;
          transition: all 0.2s;
          border-radius: 6px;
        }

        .share-button:hover {
          color: #333;
          background: rgba(0, 0, 0, 0.05);
        }

        @media (max-width: 600px) {
          .post-card {
            margin: 10px;
            border-radius: 4px;
          }

          .post-header,
          .post-content,
          .post-footer {
            padding: 15px;
          }

          .post-title {
            font-size: 20px;
          }

          .post-actions {
            gap: 8px;
          }

          .action-button,
          .share-button {
            padding: 6px 8px;
          }
        }
      `}</style>
    </article>
  );
};

export default Post;