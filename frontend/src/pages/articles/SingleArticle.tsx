import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Article } from '../../types/Articles';
import { Link } from 'react-router-dom';

const SingleArticle: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [article, setArticle] = useState<Article | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    introduction: '',
    body: '',
    conclusion: '',
    author: '',
    imageUrl: ''
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
        imageUrl: data.imageUrl
      });
    };
    fetchArticle();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:4000/api/articles/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (response.ok) {
      setIsEditing(false);
      const updatedArticle: Article = await response.json();
      setArticle(updatedArticle);
    }
  };

  const handleDelete = async () => {
    const response = await fetch(`http://localhost:4000/api/articles/articles/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' }
    })
    if (response.ok) {
      navigate('/articles')
    } else{
      alert('Something went wrong')
    }
  }

  return (
    <div className="container mx-auto p-4">
      {isEditing ? (
        <form onSubmit={handleEdit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Introduction</label>
            <textarea
              name="introduction"
              value={formData.introduction}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Conclusion</label>
            <textarea
              name="conclusion"
              value={formData.conclusion}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors duration-200"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 transition-colors duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {article?.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-64 object-cover rounded-md shadow-md"
            />
          )}
          <h1 className="text-3xl font-bold">{article?.title}</h1>
          <p className="text-lg text-gray-700">{article?.introduction}</p>
          <p className="text-gray-700">{article?.body}</p>
          <p className="text-lg text-gray-700">{article?.conclusion}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors duration-200"
            >
              Edit
            </button>
            <button onClick={handleDelete} className="px-4 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700 transition-colors duration-200">Delete</button>
          </div>
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
