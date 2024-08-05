const API_URL = import.meta.env.VITE_API_URL;
const RAPID_API_KEY = import.meta.env.VITE_RAPID_API_KEY;
const API_HOST = import.meta.env.VITE_API_HOST;

export const fetchCryptoData = async () => {
    console.log(API_URL)
  try {
    const response = await fetch(`${API_URL}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&orderBy=marketCap&orderDirection=desc&limit=10&offset=0`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': RAPID_API_KEY,
        'x-rapidapi-host': API_HOST,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch cryptocurrencies');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    throw error;
  }
};
