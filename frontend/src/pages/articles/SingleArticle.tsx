// src/components/SingleArticle.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Article } from '../../types/Articles';
import { useUser } from '../../contexts/userContext';
import { Link } from 'react-router-dom';

const SingleArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUser();
  const [article, setArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    introduction: '',
    body: '',
    conclusion: '',
    author: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await fetch(`http://localhost:4000/api/articles/articles/${id}`);
      const data: Article = await response.json();
      setArticle(data);
      setFormData({
        title: data.title,
        introduction: data.introduction,
        body: data.body,
        conclusion: data.conclusion,
        author: data.author,
        imageUrl: data.imageUrl,
      });
    };
    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this article?');
    if (confirmDelete) {
      await fetch(`http://localhost:4000/api/articles/articles/${id}`, {
        method: 'DELETE',
      });
      navigate('/articles');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    await fetch(`http://localhost:4000/api/articles/articles/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    setIsEditing(false);
    setArticle({
      ...article!,
      ...formData,
    });
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12">
      <img 
        src={article.imageUrl} 
        alt={article.title} 
        className="w-full h-auto object-cover rounded-lg"
      />
      {isEditing ? (
        <>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full mt-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={handleChange}
            className="block w-full mt-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <textarea
            name="body"
            value={formData.body}
            onChange={handleChange}
            className="block w-full mt-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <textarea
            name="conclusion"
            value={formData.conclusion}
            onChange={handleChange}
            className="block w-full mt-4 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
          <div className="flex flex-col sm:flex-row gap-2 mt-4">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-600 text-white rounded-md shadow hover:bg-green-700 transition-colors duration-200"
            >
              Update
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-4">{article.title}</h1>
          <p className="text-gray-600 mt-2 text-sm sm:text-base md:text-lg">{article.introduction}</p>
          <div className="mt-4">
            <p className="text-sm sm:text-base md:text-lg">{article.body}</p>
          </div>
          <p className="mt-4 text-sm sm:text-base md:text-lg">{article.conclusion}</p>
          <p className="mt-4 font-bold text-sm sm:text-base md:text-lg">Author: {article.author}</p>
        </>
      )}

      {user && user.username === article.author && (
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors duration-200"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition-colors duration-200"
          >
            Delete
          </button>
        </div>
      )}
      <Link 
        to="/articles" 
        className="mt-4 inline-block px-4 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 transition-colors duration-200"
      >
        All Articles
      </Link>
    </div>
  );
};

export default SingleArticle;
