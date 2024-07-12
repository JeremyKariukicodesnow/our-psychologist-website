import React, { useState } from 'react';
import styled from 'styled-components';

const JournalContainer = styled.div`
  padding: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #007acc;
  font-size: 16px;
`;

const Button = styled.button`
  background: #007acc;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 10px 0;
  border-radius: 5px;
  cursor: pointer;
`;

export const PersonalJournal: React.FC = () => {
  const [entry, setEntry] = useState<string>('');
  const [journal, setJournal] = useState<string[]>([]);

  const addEntry = () => {
    if (entry.trim()) {
      setJournal([entry, ...journal]);
      setEntry('');
    }
  };

  return (
    <JournalContainer>
      <h2>Personal Journal</h2>
      <TextArea
        value={entry}
        onChange={(e) => setEntry(e.target.value)}
        placeholder="Write down your thoughts..."
      />
      <Button onClick={addEntry}>Add Entry</Button>
      <ul>
        {journal.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </JournalContainer>
  );
};
