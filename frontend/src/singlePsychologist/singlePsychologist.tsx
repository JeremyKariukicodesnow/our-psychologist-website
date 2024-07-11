import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPsychologistByUsername } from '../psychologistPage/fetch';
import { Psychologist } from '../psychologistPage/psychologyInterface';
import './PsychologistOne.css';

const PsychologistProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [psychologist, setPsychologist] = useState<Psychologist | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPsychologist = async () => {
      try {
        if (username) {
          const data = await fetchPsychologistByUsername(username);
          setPsychologist(data);
        }
      } catch (error) {
        setError('Failed to fetch psychologist profile');
      }
    };
    getPsychologist();
  }, [username]);

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
        <Link to="/psychologists">
          <button>Back to Psychologists</button>
        </Link>
      </div>
    </div>
  );
};

export default PsychologistProfile;
