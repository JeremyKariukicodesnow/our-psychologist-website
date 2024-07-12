import React, { useState } from 'react';
import styled from 'styled-components';

const PlanContainer = styled.div`
  padding: 10px;
`;

const Input = styled.input`
  width: calc(100% - 22px);
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  border: 1px solid #007acc;
`;

const PlanItem = styled.div`
  background: #e0f7ff;
  border: 1px solid #007acc;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0;
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

export const EmergencyPlan: React.FC = () => {
  const [contact, setContact] = useState<string>('');
  const [strategy, setStrategy] = useState<string>('');
  const [plan, setPlan] = useState<{ contacts: string[], strategies: string[] }>({
    contacts: [],
    strategies: []
  });

  const addContact = () => {
    if (contact.trim()) {
      setPlan(prevPlan => ({
        ...prevPlan,
        contacts: [contact, ...prevPlan.contacts]
      }));
      setContact('');
    }
  };

  const addStrategy = () => {
    if (strategy.trim()) {
      setPlan(prevPlan => ({
        ...prevPlan,
        strategies: [strategy, ...prevPlan.strategies]
      }));
      setStrategy('');
    }
  };

  return (
    <PlanContainer>
      <h2 className='flex justify-center font-bold'>Emergency Plan</h2>
      <h3>Emergency Contacts</h3>
      <Input
        value={contact}
        onChange={(e) => setContact(e.target.value)}
        placeholder="Add emergency contact"
      />
      <Button onClick={addContact}>Add Contact</Button>
      {plan.contacts.map((item, index) => (
        <PlanItem key={index}>{item}</PlanItem>
      ))}
      <h3>Coping Strategies</h3>
      <Input
        value={strategy}
        onChange={(e) => setStrategy(e.target.value)}
        placeholder="Add coping strategy"
      />
      <Button onClick={addStrategy}>Add Strategy</Button>
      {plan.strategies.map((item, index) => (
        <PlanItem key={index}>{item}</PlanItem>
      ))}
    </PlanContainer>
  );
};
