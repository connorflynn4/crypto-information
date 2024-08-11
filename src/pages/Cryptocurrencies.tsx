import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from '../api/cryptoService';
import { ClipLoader } from 'react-spinners';
import CryptoList from '../components/CryptoList';

const Cryptocurrencies: React.FC = () => {
  const [coins, setCoins] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>('default');

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const data = await fetchCryptoData();
        setCoins(data.coins.slice(0, 100)); // Load the first 100 coins
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
    };

    getCryptoData();
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOrder = e.target.value;
    setSortOrder(sortOrder);
  };

  const sortCoins = (coins: any[]) => {
    return coins.sort((a, b) => {
      if (sortOrder === 'desc') {
        return parseFloat(b.change) - parseFloat(a.change); // Sort by biggest positive change
      } else if (sortOrder === 'asc') {
        return parseFloat(a.change) - parseFloat(b.change); // Sort by biggest negative change
      } else {
        return parseFloat(b.marketCap) - parseFloat(a.marketCap); // Default sort by market cap
      }
    });
  };

  const filteredCoins = sortCoins(
    coins.filter((coin) =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader size={50} color="#123abc" loading={true} />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Cryptocurrencies</h2>
          <p className="mt-4 text-gray-500 sm:text-xl">
            Explore the top 100 cryptocurrencies by market cap. Stay informed on their prices, market caps, and 24-hour changes.
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <div className="flex justify-between mb-6">
            <input
              type="text"
              placeholder="Search Cryptocurrencies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border rounded-md w-1/2"
            />
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="px-4 py-2 border rounded-md"
            >
              <option value="default">Sort by Market Cap</option>
              <option value="desc">Biggest Positive Change</option>
              <option value="asc">Biggest Negative Change</option>
            </select>
          </div>
          <CryptoList coins={filteredCoins} />
        </div>
      </div>
    </section>
  );
};

export default Cryptocurrencies;
