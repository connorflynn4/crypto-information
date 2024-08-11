const API_URL = import.meta.env.VITE_API_COIN_URL;
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const API_HOST = import.meta.env.VITE_API_HOST;

export const fetchCoinDetail = async (uuid: string, timePeriod: string = '24h') => {
  try {
    const response = await fetch(`${API_URL}/coin/${uuid}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': API_HOST,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch coin details');
    }

    const data = await response.json();
    return data.data.coin;
  } catch (error) {
    console.error('Error fetching coin details:', error);
    throw error;
  }
};
