import React, { useEffect, useState } from 'react';
import { fetchCryptoData } from '../api/cryptoService';
import numeral from 'numeral'

const Homepage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCryptoData = async () => {
      try {
        const data = await fetchCryptoData();
        setStats(data.stats);
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const statItems = [
    { label: 'Total', value: stats.total },
    { label: 'Total Coins', value: stats.totalCoins },
    { label: 'Total Markets', value: stats.totalMarkets },
    { label: 'Total Exchanges', value: stats.totalExchanges },
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
              <div key={stat.label} className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
                <dt className="order-last text-lg font-medium text-gray-500">{stat.label}</dt>
                <dd className="text-2xl font-extrabold text-blue-600 md:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};

export default Homepage;
