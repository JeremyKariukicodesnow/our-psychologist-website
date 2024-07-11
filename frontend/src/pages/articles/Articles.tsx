import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types/Articles';
import { useInView } from 'react-intersection-observer';


const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('http://localhost:4000/api/articles/articles');
      const data: Article[] = await response.json();
      setArticles(data);
    };

    fetchArticles();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredArticles = articles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <FadeInSection>
        <img
          src="https://i.pinimg.com/564x/ab/1b/48/ab1b482180444b34e588bc39c0d0051c.jpg"
          alt=""
          className='w-auto m-auto mt-20 rounded-sm'
        />
      </FadeInSection>
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
            <FadeInSection key={article._id}>
              <li className="bg-white rounded-md shadow-md p-4">
                <Link
                  to={`/articles/${article._id}`}
                  className="text-2xl font-bold text-blue-600 hover:underline"
                >
                  {article.title}
                </Link>
                <p className="text-gray-700">{article.introduction}</p>
              </li>
            </FadeInSection>
          ))
        ) : (
          <li className="text-center text-gray-500">No articles found</li>
        )}
      </ul>
      <Link
        to="/articles/new"
        className="block mt-4 text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
      >
        Write an Article
      </Link>
    </div>
  );
};

const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div
      ref={ref}
      className={`transform transition-opacity duration-700 ease-in-out ${
        inView ? 'opacity-100' : 'opacity-0 translate-y-10'
      }`}
    >
      {children}
    </div>
  );
};

export default Articles;
