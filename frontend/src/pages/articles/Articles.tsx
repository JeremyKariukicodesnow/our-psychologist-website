import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../types/Articles';
import { useInView } from 'react-intersection-observer';
import { useUser } from '../../contexts/userContext';
import { motion } from 'framer-motion';
import './Article.css';
import { BASE_URL } from '../../constants/url';

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const { isPsychologist } = useUser();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/articles/articles`);
        if (!response.ok) {
          throw new Error('Failed to fetch articles');
        }
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (err: any) {
        setError(err.message);
      }
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
    <div className="container mx-auto p-4 font-poppins">
      <FadeInSection>
        <img
          src="https://i.pinimg.com/564x/ab/1b/48/ab1b482180444b34e588bc39c0d0051c.jpg"
          alt="Blue flower"
          className="w-auto m-auto mt-20 rounded-sm"
        />
      </FadeInSection>
      <h1 className="text-3xl font-bold mb-4 text-blue-700">Our Articles</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Search articles by title"
      />
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        <ul className="space-y-4">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <FadeInSection key={article._id}>
                <motion.li
                  className="bg-white rounded-md shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Link
                    to={`/articles/${article._id}`}
                    className="text-2xl font-bold text-blue-600 hover:underline"
                  >
                    {article.title}
                  </Link>
                  <p className="text-gray-700 mt-2">{article.introduction}</p>
                </motion.li>
              </FadeInSection>
            ))
          ) : (
            <li className="text-center text-gray-500">No articles found</li>
          )}
        </ul>
      )}
      {isPsychologist && (
        <Link
          to="/articles/new"
          className="fixed bottom-16 right-8 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 z-50"
        >
          Write an Article
        </Link>
      )}
      <BackToTopButton />
    </div>
  );
};

const FadeInSection: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <motion.div
      ref={ref}
      className={`transform transition-opacity duration-700 ease-in-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const BackToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <div className="fixed bottom-20 left-4">
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className="bg-blue-400 text-white p-2 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Scroll to top"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          ↑
        </motion.button>
      )}
    </div>
  );
};

export default Articles;
