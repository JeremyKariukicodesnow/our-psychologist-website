import axios, { AxiosError } from 'axios';
import { Psychologist } from './psychologyInterface';
import { BASE_URL } from '../constants/url';

const API_URL = `${BASE_URL}/psychology`;

export const fetchPsychologists = async (): Promise<Psychologist[]> => {
  try {
    const response = await axios.get(`${API_URL}/psychologists`);
    console.log('Fetched psychologists:', response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error fetching psychologists:', error.message);
    } else if (error instanceof Error) {
      console.error('General error fetching psychologists:', error.message);
    } else {
      console.error('Unknown error fetching psychologists:', error);
    }
    throw error;
  }
};

export const fetchPsychologistByUsername = async (username: string): Promise<Psychologist> => {
  try {
    const response = await axios.get(`${API_URL}/psychologist/${username}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Axios error fetching psychologist (${username}):`, error.message);
    } else if (error instanceof Error) {
      console.error(`General error fetching psychologist (${username}):`, error.message);
    } else {
      console.error(`Unknown error fetching psychologist (${username}):`, error);
    }
    throw error;
  }
};
