import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';

const ArticleWrite: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: '',
    introduction: '',
    body: '',
    conclusion: '',
    author: user?.username || '',
    imageUrl: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          imageUrl: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!formData.title || !formData.introduction || !formData.body || !formData.conclusion) {
      setError('Please fill out all required fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:4000/api/articles/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <p className="text-red-500 text-center">{error}</p>}
        <div>
          <label className="block text-lg font-semibold text-gray-800">Title</label>
          <input
            name="title"
            placeholder="Enter the title"
            value={formData.title}
            onChange={handleChange}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-lg focus:ring-blue-500 focus:border-blue-500 transition duration-300 ease-in-out"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-800">Introduction</label>
          <textarea
            name="introduction"
            placeholder="Enter the introduction"
            value={formData.introduction}
            onChange={handleChange}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-lg focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[200px] transition duration-300 ease-in-out"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-800">Body</label>
          <textarea
            name="body"
            placeholder="Enter the body of the article"
            value={formData.body}
            onChange={handleChange}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-lg focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[300px] transition duration-300 ease-in-out"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-800">Conclusion</label>
          <textarea
            name="conclusion"
            placeholder="Enter the conclusion"
            value={formData.conclusion}
            onChange={handleChange}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-lg focus:ring-blue-500 focus:border-blue-500 resize-y min-h-[150px] transition duration-300 ease-in-out"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-800">Author</label>
          <input
            name="author"
            placeholder="Author"
            value={formData.author}
            onChange={handleChange}
            className="mt-2 block w-full border border-gray-300 rounded-md shadow-sm p-3 text-lg focus:ring-blue-500 focus:border-blue-500"
            required
            disabled
          />
        </div>
        <div>
          <label className="block text-lg font-semibold text-gray-800">Upload Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-md cursor-pointer focus:outline-none focus:border-transparent focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col gap-4 mt-6">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
          >
            Create Article
          </button>
          <Link to="/articles" className="px-6 py-3 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 transition duration-300 ease-in-out">
            All Articles
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ArticleWrite;
