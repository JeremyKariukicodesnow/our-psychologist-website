import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './PsychologistOne.css';
import { fetchPsychologistByUsername } from '../psychologistPage/fetch'; // Import fetchPsychologistByUsername here
import { BASE_URL } from '../constants/url';

interface Article {
  _id: string;
  title: string;
  introduction: string;
}

interface Psychologist {
  username: string;
  profilePic: string;
  description: string;
  email: string;
}

const PsychologistProfile: React.FC = () => {
  const { username } = useParams<{ username?: string }>(); // Make username optional
  const [psychologist, setPsychologist] = useState<Psychologist | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPsychologistAndArticles = async () => {
      try {
        if (username) { // Check if username is defined
          // Fetch psychologist profile
          const psychologistData = await fetchPsychologistByUsername(username); // Use fetchPsychologistByUsername
          setPsychologist(psychologistData);

          // Fetch articles by this psychologist
          const articlesData = await axios.get(`${BASE_URL}/api/articles/articles/author/${username}`);
          setArticles(articlesData.data);
        }
      } catch (error) {
        console.error('Error fetching psychologist profile or articles:', error);
        setError('Failed to fetch psychologist profile or articles');
      } finally {
        setLoading(false);
      }
    };

    fetchPsychologistAndArticles();
  }, [username]);

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-details skeleton-card">
          <div className="skeleton skeleton-circle"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
        <div className="psychologist-articles">
          <h2 className="skeleton skeleton-text"></h2>
          <div className="skeleton skeleton-article"></div>
          <div className="skeleton skeleton-article"></div>
          <div className="skeleton skeleton-article"></div>
        </div>
      </div>
    );
  }

  if (!psychologist) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h1>{psychologist.username}</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="profile-details">
        <img src={psychologist.profilePic} alt={`${psychologist.username}'s profile`} />
        <p>{psychologist.description}</p>
        <p className="email">{psychologist.email}</p>
        <Link to="/psychologists">
          <button>Back to Psychologists</button>
        </Link>
      </div>

      {/* Display articles by this psychologist */}
      <div className="psychologist-articles">
        <h2>Articles by {psychologist.username}</h2>
        {articles.length > 0 ? (
          <ul className="article-list">
            {articles.map((article) => (
              <li key={article._id} className="article-item">
                <Link to={`/articles/${article._id}`} className="article-title">
                  {article.title}
                </Link>
                <p className="article-intro">{article.introduction}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No articles found by {psychologist.username}</p>
        )}
      </div>
    </div>
  );
};

export default PsychologistProfile;
