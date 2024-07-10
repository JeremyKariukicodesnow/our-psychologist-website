import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types/Articles';

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('http://localhost:4000/api/articles/articles');
      const data: Article[] = await response.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredArticles = articles.filter(article => article.title.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div className="container mx-auto p-4">
      <img src="https://i.pinimg.com/564x/ab/1b/48/ab1b482180444b34e588bc39c0d0051c.jpg" alt="" className='w-auto m-auto mt-20 rounded-sm'/>
      <h1 className="text-3xl font-bold mb-4">Our Articles</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />
      <ul className="space-y-4">
      {filteredArticles.length > 0 ? (
          filteredArticles.map(article => (
            <li key={article._id} className="bg-white rounded-md shadow-md p-4">
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <Link
                to={`/articles/${article._id}`}
                className="text-2xl font-bold text-blue-600 hover:underline"
              >
                {article.title} 
              </Link>
              <p className="text-gray-700">{article.introduction}</p>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No articles found</li>
        )}
      </ul>
      <Link
        to="/articles/new"
        className="block mt-4 text-center bg-blue-600 hover:underline w-40 h-12 rounded-lg"
      >
        Write an Article
      </Link>
    </div>
  );
};

export default Articles;
