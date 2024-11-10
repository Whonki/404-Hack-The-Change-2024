import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you have this firebase config file

const PostCard = ({ post, expanded, onClick }) => {
  return (
    <article 
      onClick={onClick}
      className={`w-full max-w-2xl mx-auto my-5 rounded-xl bg-white shadow-lg overflow-hidden 
        transform transition-transform duration-300 cursor-pointer hover:shadow-xl hover:scale-105
        ${expanded ? 'scale-105' : 'scale-100'}`}
    >
      <header className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{post.Title}</h2>
            <p className="text-xs text-gray-500">
              {new Date(post.CreatedAt?.seconds * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {post.Tags?.map((tag, index) => (
            <span key={index} className="px-3 py-1 rounded-full bg-gray-200 text-xs text-gray-700">
              {tag}
            </span>
          ))}
          {post.Languages?.map((language, index) => (
            <span key={`lang-${index}`} className="px-3 py-1 rounded-full bg-blue-200 text-xs text-blue-700">
              {language}
            </span>
          ))}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            post.Status === 'published' ? 'bg-green-200 text-green-700' : 'bg-yellow-200 text-yellow-700'
          }`}>
            {post.Status}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            post.Visibility === 'public' ? 'bg-gray-200 text-gray-700' : 'bg-purple-200 text-purple-700'
          }`}>
            {post.Visibility}
          </span>
        </div>
      </header>

      <div className={`p-6 text-gray-700 leading-relaxed ${expanded ? 'block' : 'line-clamp-3'}`}>
        <p>{post.Content}</p>
      </div>

      {expanded && (
        <footer className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Handle messaging logic here
              console.log('Message user:', post.UserId);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-500 text-white font-medium hover:bg-green-600 transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5" />
            Message
          </button>
        </footer>
      )}
    </article>
  );
};

const PostsFeed = () => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState(null);

  const POSTS_PER_PAGE = 10;

  const fetchPosts = async (isInitial = false) => {
    try {
      setLoading(true);
      
      let postsQuery = query(
        collection(db, 'Posts'),
        orderBy('CreatedAt', 'desc'),
        limit(POSTS_PER_PAGE)
      );

      if (!isInitial && lastDoc) {
        postsQuery = query(
          collection(db, 'Posts'),
          orderBy('CreatedAt', 'desc'),
          startAfter(lastDoc),
          limit(POSTS_PER_PAGE)
        );
      }

      const snapshot = await getDocs(postsQuery);
      
      if (snapshot.empty) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const newPosts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
      setPosts(isInitial ? newPosts : [...posts, ...newPosts]);
      
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(true);
  }, []);

  // Intersection Observer for infinite scroll
  const observerTarget = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchPosts();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, loading, lastDoc]);

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50">
      {posts.map(post => (
        <PostCard 
          key={post.id}
          post={post}
          expanded={expandedPostId === post.id}
          onClick={() => setExpandedPostId(expandedPostId === post.id ? null : post.id)}
        />
      ))}
      
      {loading && (
        <div className="w-full flex justify-center p-4">
          <div className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {!loading && hasMore && (
        <div ref={observerTarget} className="w-full h-10 bg-gray-50" />
      )}
      
      {!hasMore && posts.length > 0 && (
        <p className="text-center text-gray-500 my-4 italic">No more posts to load</p>
      )}
      
      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-500 my-4 italic">No posts found</p>
      )}
    </div>
  );
};

export default PostsFeed;
