import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { MessageCircle, Users } from "lucide-react";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  where,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import styles from "./PostsCard.module.css";

const PostsFeed = ({ currentUserId }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleCreateOrSelectRoom = async (targetUserId) => {
    try {
      if (!currentUserId || !targetUserId) {
        console.error("User IDs are missing:", { currentUserId, targetUserId });
        return;
      }

      const roomsQuery = query(
        collection(db, "Chatrooms"),
        where("Users", "array-contains", currentUserId)
      );

      const snapshot = await getDocs(roomsQuery);
      let roomExists = false;
      let roomId = null;

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.Users.includes(targetUserId) && data.Users.length === 2) {
          roomExists = true;
          roomId = doc.id;
        }
      });

      if (!roomExists) {
        const newRoomRef = await addDoc(collection(db, "Chatrooms"), {
          Users: [currentUserId, targetUserId],
          createdAt: new Date(),
        });
        roomId = newRoomRef.id;
      }

      console.log(`Room created or selected with ID: ${roomId}`);

      // Navigate to chat page with roomId
      navigate(`/chat/${roomId}`);
    } catch (error) {
      console.error("Error creating or selecting room:", error.message, error.code, error);
    }
  };

  const PostCard = ({ post, expanded, onClick, handleCreateOrSelectRoom }) => {
    return (
      <article
        onClick={onClick}
        className={`${styles.postCard} ${expanded ? styles.expanded : ""}`}
      >
        <header className={styles.header}>
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h2 className={styles.headerTitle}>{post.Title}</h2>
              <p className={styles.headerDate}>
                {new Date(post.CreatedAt?.seconds * 1000).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className={styles.tags}>
            {post.Tags?.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
            {post.Languages?.map((language, index) => (
              <span key={`lang-${index}`} className={styles.language}>
                {language}
              </span>
            ))}
            <span
              className={`${styles.status} ${
                post.Status === "published"
                  ? styles.statusPublished
                  : styles.statusDraft
              }`}
            >
              {post.Status}
            </span>
            <span
              className={`${styles.visibility} ${
                post.Visibility === "public"
                  ? styles.visibilityPublic
                  : styles.visibilityPrivate
              }`}
            >
              {post.Visibility}
            </span>
          </div>
        </header>

        <div
          className={`${styles.content} ${expanded ? "block" : "line-clamp-3"}`}
        >
          <p>{post.Content}</p>
        </div>

        {expanded && (
          <footer className={styles.footer}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleCreateOrSelectRoom(post.id);
              }}
              className={styles.messageButton}
            >
              <MessageCircle className="w-5 h-5" />
              Message
            </button>
          </footer>
        )}
      </article>
    );
  };

  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [expandedPostId, setExpandedPostId] = useState(null);

  const POSTS_PER_PAGE = 10;

  const fetchPosts = async (isInitial = false) => {
    setLoading(true);
    let postsQuery = query(
      collection(db, "Posts"),
      orderBy("CreatedAt", "desc"),
      limit(POSTS_PER_PAGE)
    );

    if (!isInitial && lastDoc) {
      postsQuery = query(
        collection(db, "Posts"),
        orderBy("CreatedAt", "desc"),
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

    const newPosts = snapshot.docs.map((doc) => ({
      id: doc.ref.id,
      ...doc.data(),
    }));

    setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    setPosts(isInitial ? newPosts : [...posts, ...newPosts]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(true);
  }, []);

  const observerTarget = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
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
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          expanded={expandedPostId === post.id}
          onClick={() =>
            setExpandedPostId(expandedPostId === post.id ? null : post.id)
          }
          handleCreateOrSelectRoom={handleCreateOrSelectRoom}
        />
      ))}

      {loading && <p>Loading...</p>}

      {!loading && hasMore && <div ref={observerTarget} />}

      {!hasMore && posts.length > 0 && <p>No more posts to load</p>}

      {!loading && posts.length === 0 && <p>No posts found</p>}
    </div>
  );
};

export default PostsFeed;
