import React, { useEffect, useState } from 'react';
import { fetchPsychologists } from './fetch';
import { Psychologist } from './psychologyInterface';
import { Link } from 'react-router-dom';
import './PsychologistList1.css';

const placeholderImage = 'data:image/svg+xml;base64,...'; // Your base64-encoded placeholder image

const PsychologistList: React.FC = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPsychologists = async () => {
      try {
        const data = await fetchPsychologists();
        setPsychologists(data);
      } catch (error) {
        setError('Failed to fetch psychologists');
      } finally {
        setLoading(false);
      }
    };
    getPsychologists();
  }, []);

  return (
    <div className="psychologists-container">
      <h1 className='mt-20'>Psychologists</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="psychologists-grid">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div className="psychologist-card skeleton-card" key={index}>
              <div className="skeleton skeleton-circle"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-text"></div>
              <div className="skeleton skeleton-button"></div>
            </div>
          ))
        ) : (
          psychologists.map(psychologist => (
            <div className="psychologist-card" key={psychologist.id}>
              {psychologist.profilePic ? (
                <img 
                  src={psychologist.profilePic} 
                  alt={`${psychologist.username}'s profile`} 
                  className="profile-image"
                  onError={(e) => {
                    e.currentTarget.src = placeholderImage;
                  }}
                />
              ) : (
                <div className="placeholder-img">No Image</div>
              )}
              <h2>{psychologist.username || 'No Name'}</h2>
              <p>{psychologist.description ? psychologist.description.substring(0, 100) + '...' : 'No Description'}</p>
              <p className='email'>{psychologist.email}</p>
              <Link to={`/psychologists/${psychologist.username}`}>
                <button>View Profile</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PsychologistList;
