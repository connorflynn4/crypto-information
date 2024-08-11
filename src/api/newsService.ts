// src/api/newsService.ts

const API_URL = import.meta.env.VITE_API_NEWS_URL;
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const API_HOST = import.meta.env.VITE_API_NEWS_HOST;

export const fetchNews = async () => {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': API_HOST,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
};
