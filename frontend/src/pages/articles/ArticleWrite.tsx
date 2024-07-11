import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ArticleWrite: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    introduction: '',
    body: '',
    conclusion: '',
    author: '',
    imageUrl: '',
    //categoryId: ''
  });
  const [error, setError] = useState<string | null>(null);
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageUrl: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/articles/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        navigate('/articles');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (err) {
      console.log(err);
      setError('An error occurred while creating the article.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-500">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700 mt-16">Title</label>
          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Introduction</label>
          <textarea
            name="introduction"
            placeholder="Introduction"
            value={formData.introduction}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Body</label>
          <textarea
            name="body"
            placeholder="Body"
            value={formData.body}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Conclusion</label>
          <textarea
            name="conclusion"
            placeholder="Conclusion"
            value={formData.conclusion}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Author</label>
          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Upload Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="mt-1 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition-colors duration-200"
        >
          Create Article
        </button>
        <button><Link to='/articles'  className="mt-4 inline-block px-4 py-2 bg-gray-600 text-white rounded-md shadow hover:bg-gray-700 transition-colors duration-200 ml-6">All Articles</Link></button>
      </form>
    </div>
  );
};

export default ArticleWrite;
