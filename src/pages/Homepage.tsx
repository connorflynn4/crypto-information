import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from '../api/cryptoService';
import numeral from 'numeral';
import { ClipLoader } from 'react-spinners';

const Homepage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [coins, setCoins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const data = await fetchCryptoData();
        setStats(data.stats);
        setCoins(data.coins.slice(0, 10)); // Load the first 10 coins initially
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

  const loadMoreCoins = async () => {
    try {
      setLoadingMore(true);
      const data = await fetchCryptoData(); // Fetch all coins
      const newCoins = data.coins.slice(10, 100); // Load the next 90 coins
      setCoins((prevCoins) => [...prevCoins, ...newCoins]);
      setLoadingMore(false);
      setHasMore(false); // Disable "Load More" as all 100 coins are loaded
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      setLoadingMore(false);
    }
  };

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

  const statItems = [
    { label: 'Total Coins', value: numeral(stats.totalCoins).format('0,0') },
    { label: 'Total Markets', value: numeral(stats.totalMarkets).format('0,0') },
    { label: 'Total Exchanges', value: numeral(stats.totalExchanges).format('0,0') },
    { label: 'Total Market Cap', value: numeral(stats.totalMarketCap).format('$0.0a').toUpperCase() },
    { label: 'Total 24h Volume', value: numeral(stats.total24hVolume).format('$0.0a').toUpperCase() },
  ];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Cryptocurrency Information</h2>
          <p className="mt-4 text-gray-500 sm:text-xl">
            Stay updated with the latest trends and news in the cryptocurrency market. Track your favorite coins and stay informed on market movements and updates.
          </p>
        </div>

        <div className="mt-8 sm:mt-12">
          <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
            {statItems.map((stat) => (
              <div key={stat.label} className="flex flex-col rounded-lg bg-blue-50 px-4 py-6 text-center">
                <dt className="order-last text-base font-medium text-gray-500">{stat.label}</dt>
                <dd className="text-xl font-bold text-blue-600 md:text-2xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-12 sm:mt-16">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl font-bold text-gray-900 sm:text-4xl">Top 10 Cryptocurrencies</h3>
            <p className="mt-4 text-gray-500 sm:text-xl">
              Explore the top 10 cryptocurrencies by market cap. Stay informed on their prices, market caps, and 24-hour changes.
            </p>
          </div>
          <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {coins.map((coin, index) => (
              <li key={coin.uuid} className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
                <div className="flex items-center">
                  <div className="flex-grow">
                    <h4 className="text-lg font-bold text-gray-800">{index + 1}. {coin.name}</h4>
                  </div>
                  <div className="w-12 h-12 ml-4">
                    <img src={coin.iconUrl} alt={coin.name} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{coin.symbol}</p>
                  <p className="text-md font-medium text-blue-600">Price: {numeral(coin.price).format('$0,0.00')}</p>
                  <p className="text-sm text-gray-500">Market Cap: {numeral(coin.marketCap).format('$0.0a').toUpperCase()}</p>
                  <p className={`text-sm ${parseFloat(coin.change) > 0 ? 'text-green-500' : 'text-red-500'}`}>24h Change: {coin.change}%</p>
                </div>
              </li>
            ))}
          </ul>
          {hasMore && (
            <div className="mt-8 text-center">
              <button
                onClick={loadMoreCoins}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
              >
                Load More
              </button>
            </div>
          )}
          {loadingMore && (
            <div className="flex items-center justify-center mt-4">
              <ClipLoader size={30} color="#123abc" loading={true} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Homepage;
