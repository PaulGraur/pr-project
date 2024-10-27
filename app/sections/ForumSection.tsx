"use client";
import React, { useState, useEffect } from "react";

interface Post {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Post[];
}

const ForumSection: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState("");
  const [author, setAuthor] = useState("");
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const savedPosts = localStorage.getItem("forumPosts");
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("forumPosts", JSON.stringify(posts));
  }, [posts]);

  const handleAddPost = (parentId: number | null = null) => {
    if (newPost.trim() === "" || author.trim() === "") {
      alert("Будь ласка, введіть ім'я користувача і повідомлення.");
      return;
    }

    const newPostObject: Post = {
      id: Date.now(),
      author: author || "Anonymous",
      content: newPost,
      timestamp: new Date().toLocaleString(),
      likes: 0,
      replies: [],
    };

    if (parentId === null) {
      setPosts([newPostObject, ...posts]);
    } else {
      setPosts(
        posts.map((post) =>
          post.id === parentId
            ? { ...post, replies: [newPostObject, ...post.replies] }
            : post
        )
      );
    }

    setNewPost("");
    setAuthor("");
  };

  const handleLike = (postId: number) => {
    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    );
    setPosts(updatedPosts);
  };

  const handleDelete = (postId: number) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const handleEdit = (postId: number, content: string) => {
    setIsEditing(postId);
    setEditContent(content);
  };

  const handleSaveEdit = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, content: editContent } : post
      )
    );
    setIsEditing(null);
    setEditContent("");
  };

  const renderPost = (post: Post, isReply = false) => (
    <div
      key={post.id}
      className={`p-4 mb-4 bg-white rounded-lg shadow-md border-l-4 ${
        isReply ? "ml-8 border-blue-300" : "border-blue-500"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="font-semibold text-blue-700">{post.author}</p>
        <p className="text-gray-500 text-sm">{post.timestamp}</p>
      </div>
      {isEditing === post.id ? (
        <textarea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          className="w-full px-3 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
        />
      ) : (
        <p className="mt-2 text-gray-800">{post.content}</p>
      )}
      <div className="mt-3 flex items-center space-x-4">
        <button
          onClick={() => handleLike(post.id)}
          className="text-indigo-500 hover:text-indigo-700 transition duration-200"
        >
          👍 {post.likes}
        </button>
        <button
          onClick={() => handleAddPost(post.id)}
          className="text-gray-500 hover:text-gray-700 transition duration-200"
        >
          Відповісти
        </button>
        {isEditing === post.id ? (
          <button
            onClick={() => handleSaveEdit(post.id)}
            className="text-green-500 hover:text-green-700 transition duration-200"
          >
            Зберегти
          </button>
        ) : (
          <button
            onClick={() => handleEdit(post.id, post.content)}
            className="text-yellow-500 hover:text-yellow-700 transition duration-200"
          >
            Редагувати
          </button>
        )}
        <button
          onClick={() => handleDelete(post.id)}
          className="text-red-500 hover:text-red-700 transition duration-200"
        >
          Видалити
        </button>
      </div>
      {post.replies.length > 0 && (
        <div className="mt-4">
          {post.replies.map((reply) => renderPost(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <section className="container">
      <div className="p-6 max-w-5xl mx-auto bg-gradient-to-r from-green-50 to-blue-50 rounded-[32px] shadow-xl">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
          Форум
        </h2>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Ваше ім'я"
            className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Напишіть ваше повідомлення..."
          />
          <button
            onClick={() => handleAddPost()}
            className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold py-2 rounded-md shadow-lg hover:from-indigo-600 hover:to-blue-600 transition duration-300"
          >
            Додати повідомлення
          </button>
        </div>
        <div>{posts.map((post) => renderPost(post))}</div>
      </div>
    </section>
  );
};

export default ForumSection;
