import React, { useState } from 'react';
import styled from 'styled-components';

const EnvironmentContainer = styled.div`
  padding: 10px;
`;

const ThemeButton = styled.button<{ selected: boolean }>`
  background: ${props => (props.selected ? '#007acc' : '#e0e0e0')};
  color: ${props => (props.selected ? '#fff' : '#000')};
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
`;

const themes = {
  light: {
    background: '#f0f8ff',
    color: '#007acc'
  },
  dark: {
    background: '#333',
    color: '#fff'
  }
};

const EnvironmentContainerWithTheme = styled(EnvironmentContainer)<{ themeStyle: any }>`
  background: ${props => props.themeStyle.background};
  color: ${props => props.themeStyle.color};
`;

export const CustomizableEnvironment: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <EnvironmentContainerWithTheme themeStyle={themes[theme]}>
      <h2>Customize Your Mood</h2>
      <ThemeButton selected={theme === 'light'} onClick={() => setTheme('light')}>Light Theme</ThemeButton>
      <ThemeButton selected={theme === 'dark'} onClick={() => setTheme('dark')}>Dark Theme</ThemeButton>
    </EnvironmentContainerWithTheme>
  );
};
