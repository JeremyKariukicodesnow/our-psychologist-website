import React, { useEffect, useState } from 'react';
import { fetchPsychologists } from './fetch';
import { Psychologist } from './psychologyInterface';
import { Link } from 'react-router-dom';
import './PsychologistList1.css';

const placeholderImage = 'data:image/svg+xml;base64,...'; // Your base64-encoded placeholder image

const PsychologistList: React.FC = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPsychologists = async () => {
      try {
        const data = await fetchPsychologists();
        setPsychologists(data);
      } catch (error) {
        setError('Failed to fetch psychologists');
      }
    };
    getPsychologists();
  }, []);

  return (
    <div className="psychologists-container">
      <h1 className='mt-20'>Psychologists</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="psychologists-grid">
        {psychologists.map(psychologist => (
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
            <p>{psychologist.description || 'No Description'}</p>
            <Link to={`/psychologists/${psychologist.username}`}>
              <button>View Profile</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PsychologistList;
