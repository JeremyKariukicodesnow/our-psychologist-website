import React, { useEffect, useState } from 'react';
import { fetchPsychologists } from './fetch';
import { Psychologist } from './psychologyInterface';
import { Link } from 'react-router-dom';
import './PsychologistList1.css';

const placeholderImage = 'data:image/svg+xml;base64,...'; // Your base64-encoded placeholder image

const PsychologistList: React.FC = () => {
  const [psychologists, setPsychologists] = useState<Psychologist[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredPsychologists = psychologists.filter(psychologist =>
    psychologist.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="psychologists-container">
      <h1 className='mt-20'>Psychologists</h1>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 p-2 border border-gray-300 rounded-md w-full"
      />
      {error && <p className="error-message">{error}</p>}
      <div className="psychologists-grid">
        {filteredPsychologists.map(psychologist => (
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
        ))}
      </div>
    </div>
  );
};

export default PsychologistList;
