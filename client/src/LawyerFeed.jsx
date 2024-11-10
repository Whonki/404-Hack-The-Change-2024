import React, { useState } from 'react';

function Post({ username, timePosted, subject, tags, location, language, details }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="post">
            <div className="post-header">
                <div><strong>Username:</strong> {username}</div>
                <div><strong>Posted:</strong> {timePosted}</div>
            </div>
            <div><strong>Subject:</strong> {subject}</div>
            <div className="post-tags"><strong>Tags:</strong> {tags.join(" ")}</div>
            <div
                className="expand-btn"
                onClick={() => setIsExpanded(!isExpanded)}
                style={{ display: isExpanded ? 'none' : 'block' }}
            >
                Expand
            </div>

            {isExpanded && (
                <div className="post-details">
                    <div><strong>Location:</strong> {location}</div>
                    <div><strong>Preferred Language:</strong> {language}</div>
                    <div><strong>Details:</strong> {details}</div>

                    <div className="action-buttons">
                        <button className="ignore-btn" onClick={() => setIsVisible(false)}>Ignore</button>
                        <button className="chat-btn">Chat</button>
                        <button className="collapse-btn" onClick={() => setIsExpanded(false)}>Collapse</button>
                    </div>
                </div>
            )}
        </div>
    );
}
function LawyerFeed() {
    const [posts, setPosts] = useState([]);

    const addPost = (post) => {
        setPosts((prevPosts) => [...prevPosts, post]);
    };

    return (
        <div>
            <h2>My Feed</h2>
            <div id="feed">
                {posts.map((post, index) => (
                    <Post key={index} {...post} />
                ))}
            </div>
        </div>
    );
}
export default LawyerFeed;