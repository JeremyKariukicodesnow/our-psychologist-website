import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/userContext';
import { Link } from 'react-router-dom';
import './Profile.css';

interface User {
  username: string;
  email: string;
  role: string;
  profilePic: string;
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
          const response = await fetch(`http://localhost:4000/psychology/psychologist/${user.username}`);
          const data: User = await response.json();
          setProfile(data);
          setFormData({
            username: data.username,
            email: data.email,
            description: data.description || '',
          });

          if (data.role === 'psychiatrist') {
            const articlesResponse = await fetch(`http://localhost:4000/api/articles/articles/author/${user.username}
`);
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
        await fetch(`http://localhost:4000/psychology/psychologist/${user.username}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        setProfile({ ...profile!, ...formData });
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  const defaultProfilePic = 'https://via.placeholder.com/150'; // Default image URL

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="container">
      <div className="profileHeader">
        <img
          src={profile.profilePic || defaultProfilePic}
          alt={profile.username}
          className="profileImage"
          onError={(e) => (e.currentTarget.src = defaultProfilePic)} // Fallback to default image on error
        />
        <div className="profileDetails">
          {isEditing ? (
            <>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="inputField"
                disabled
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="inputField"
                disabled
              />
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="textareaField"
                placeholder="Add a description"
              />
              <button
                onClick={handleUpdate}
                className="button buttonUpdate"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="button buttonCancel"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <h1 className="profileName">{profile.username}</h1>
              <p className="profileEmail">{profile.email}</p>
              {profile.role === 'psychiatrist' && profile.description && (
                <p className="profileDescription">{profile.description}</p>
              )}
              {profile.role === 'psychiatrist' && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="button buttonEdit"
                >
                  Edit Profile
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {profile.role === 'psychiatrist' && articles.length > 0 ? (
        <div className="articleList">
          <h2 className="articleListTitle">Articles by {profile.username}</h2>
          <ul className="articleItems">
            {articles.map(article => (
              <li key={article._id} className="articleItem">
                <Link
                  to={`/articles/${article._id}`}
                  className="articleTitle"
                >
                  {article.title}
                </Link>
                <p className="articleIntroduction">{article.introduction}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        profile.role === 'psychiatrist' && (
          <div className="articleList">
            <p className="noArticles">No articles available</p>
          </div>
        )
      )}
    </div>
  );
};

export default Profile;
