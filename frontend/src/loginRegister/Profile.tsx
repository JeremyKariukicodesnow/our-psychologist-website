import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/userContext';
import { Link } from 'react-router-dom';
import './Profile.css';
import { BASE_URL } from '../constants/url';

interface User {
  username: string;
  email: string;
  role: string;
  profilePic: string | null;
  description?: string;
}

interface Article {
  _id: string;
  title: string;
  introduction: string;
  body: string;
  conclusion: string;
  author: string;
  imageUrl: string;
}

const Profile: React.FC = () => {
  const { user } = useUser();
  const [profile, setProfile] = useState<User | null>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    description: '',
  });

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const response = await fetch(`${BASE_URL}/psychology/psychologist/${user.username}`);
          const data: User = await response.json();
          setProfile(data);
          setFormData({
            username: data.username,
            email: data.email,
            description: data.description || '',
          });

          if (data.role === 'psychiatrist') {
            const articlesResponse = await fetch(`${BASE_URL}/api/articles/articles/author/${user.username}`);
            const articlesData: Article[] = await articlesResponse.json();
            setArticles(articlesData);
          }
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      };

      fetchProfile();
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    if (user) {
      try {
        await fetch(`${BASE_URL}/psychology/psychologist/${user.username}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            description: formData.description,
          }),
        });
        setProfile({
          ...profile!,
          username: formData.username,
          email: formData.email,
          description: formData.description,
        });
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const defaultProfilePic = 'https://via.placeholder.com/150';

  return (
    <div className="profile-container">
      <div className="profile-header">
        {profile ? (
          <img
            src={profile.profilePic || defaultProfilePic}
            alt={profile.username}
            className="profile-image"
            onError={(e) => (e.currentTarget.src = defaultProfilePic)}
          />
        ) : (
          <div className="skeleton-circle skeleton-img"></div>
        )}
        <div className="profile-details">
          {isEditing ? (
            <>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="input-field"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-field"
              />
              {profile?.role === 'psychiatrist' && (
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea-field"
                  placeholder="Add a description"
                />
              )}
              <button onClick={handleUpdate} className="button-update">
                Update
              </button>
              <button onClick={() => setIsEditing(false)} className="button-cancel">
                Cancel
              </button>
            </>
          ) : profile ? (
            <>
              <h1 className="profile-name">{profile.username}</h1>
              <p className="profile-email">{profile.email}</p>
              {profile.role === 'psychiatrist' && profile.description && (
                <p className="profile-description">{profile.description}</p>
              )}
              {profile.role === 'psychiatrist' && (
                <button onClick={() => setIsEditing(true)} className="button-edit">
                  Edit Profile
                </button>
              )}
            </>
          ) : (
            <div className="skeleton-text"></div>
          )}
        </div>
      </div>
      {profile?.role === 'psychiatrist' ? (
        articles.length > 0 ? (
          <div className="article-list">
            <h2 className="article-list-title">Articles by {profile.username}</h2>
            <ul className="article-items">
              {articles.map(article => (
                <li key={article._id} className="article-item">
                  <Link to={`/articles/${article._id}`} className="article-title">
                    {article.title}
                  </Link>
                  <p className="article-introduction">{article.introduction}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="article-list">
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
            <div className="skeleton-text"></div>
          </div>
        )
      ) : (
        <div className="profile-details">
          <h1 className="profile-name">{profile?.username}</h1>
          <p className="profile-email">{profile?.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
