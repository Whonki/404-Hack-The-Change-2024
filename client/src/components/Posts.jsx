import React, { useState, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { collection, query, orderBy, limit, startAfter, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you have this firebase config file

const PostCard = ({ post, expanded, onClick }) => {
  return (
    <article 
      onClick={onClick}
      className={`w-full max-w-2xl mx-auto my-5 rounded-lg bg-white shadow-md overflow-hidden 
        transition-all duration-300 cursor-pointer hover:shadow-lg
        ${expanded ? 'scale-102' : 'scale-100'}`}
    >
      <header className="p-5 border-b border-gray-200">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">{post.Title}</h2>
            <p className="text-sm text-gray-600">
              {new Date(post.CreatedAt?.seconds * 1000).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {post.Tags?.map((tag, index) => (
            <span key={index} className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-600">
              {tag}
            </span>
          ))}
          {post.Languages?.map((language, index) => (
            <span key={`lang-${index}`} className="px-3 py-1 rounded-full bg-blue-100 text-sm text-blue-600">
              {language}
            </span>
          ))}
          <span className={`px-3 py-1 rounded-full text-sm ${
            post.Status === 'published' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
          }`}>
            {post.Status}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            post.Visibility === 'public' ? 'bg-gray-100 text-gray-600' : 'bg-purple-100 text-purple-600'
          }`}>
            {post.Visibility}
          </span>
        </div>
      </header>

      <div className={`p-5 text-gray-700 leading-relaxed ${expanded ? 'block' : 'line-clamp-3'}`}>
        <p>{post.Content}</p>
      </div>

      {expanded && (
        <footer className="px-5 py-4 border-t border-gray-200 flex justify-end">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              // Handle messaging logic here
              console.log('Message user:', post.UserId);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Message
          </button>
        </footer>
      )}
    </article>
  );
};

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState(null);

  const POSTS_PER_PAGE = 5;

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
    <div className="container mx-auto px-4 py-8">
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
          <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {!loading && hasMore && (
        <div ref={observerTarget} className="w-full h-10" />
      )}
      
      {!hasMore && posts.length > 0 && (
        <p className="text-center text-gray-600 my-4">No more posts to load</p>
      )}
      
      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-600 my-4">No posts found</p>
      )}
    </div>
  );
};

export default Posts;