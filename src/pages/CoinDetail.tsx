import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { fetchCoinDetail } from '../api/coinService';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';
import 'chart.js/auto';
import { generateXAxisLabels } from '../utils/ChartUtils'

const timePeriods = ['1h', '3h', '12h', '24h', '7d', '30d', '3m', '1y', '3y', '5y'];

const CoinDetail: React.FC = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [coin, setCoin] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timePeriod, setTimePeriod] = useState<string>('24h');

  useEffect(() => {
    const getCoinDetail = async () => {
      try {
        const data = await fetchCoinDetail(uuid!, timePeriod);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    getCoinDetail();
  }, [uuid, timePeriod]);

  const handleTimePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTimePeriod(event.target.value);
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

  const sparklineLength = coin.sparkline.length;
  const xAxisLabels = generateXAxisLabels(timePeriod, sparklineLength);

  const priceData = {
    labels: xAxisLabels,
    datasets: [
      {
        label: `${coin.name} Price (USD)`,
        data: coin.sparkline,
        borderColor: '#123abc',
        backgroundColor: 'rgba(18, 58, 188, 0.1)',
        fill: true,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (USD)',
        },
        ticks: {
          callback: function(value: string | number) {
            if (typeof value === 'number') {
              return numeral(value).format('$0,0.00');
            }
            return value;
          },
        },
      },
    },
  };

  return (
    <section className="bg-white px-4 py-12">
      <div className="max-w-screen-lg mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <img src={coin.iconUrl} alt={coin.name} className="w-16 h-16 mr-4" />
            <h2 className="text-3xl font-bold text-gray-900">{coin.name} ({coin.symbol})</h2>
          </div>
        </div>

        {/* Description Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">What is {coin.name}?</h3>
          <p className="text-gray-600">{coin.description}</p>
        </div>

        {/* Statistics Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">Value Statistics</h3>
            <p className="text-gray-600 mb-4">An overview showing the statistics of {coin.name}, such as the base and quote currency, the rank, and trading volume.</p>
            <p className="text-gray-600"><strong>Price to USD:</strong> {numeral(coin.price).format('$0,0.00')}</p>
            <p className="text-gray-600 mt-2"><strong>Rank:</strong> {coin.rank}</p>
            <p className="text-gray-600 mt-2"><strong>24h Volume:</strong> {numeral(coin['24hVolume']).format('$0.0a')}</p>
            <p className="text-gray-600 mt-2"><strong>Market Cap:</strong> {numeral(coin.marketCap).format('$0.0a')}</p>
            <p className="text-gray-600 mt-2"><strong>All-time-high (daily avg.):</strong> {numeral(coin.allTimeHigh.price).format('$0,0.00')}</p>
          </div>
          <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Other Stats Info</h3>
          <p className="text-gray-600 mb-4">Detailed statistics for {coin.name}, including market information, supply details, and more.</p>
          <p className="text-gray-600"><strong>Number Of Markets:</strong> {numeral(coin.numberOfMarkets).format('0,0')}</p>
          <p className="text-gray-600 mt-2"><strong>Number Of Exchanges:</strong> {numeral(coin.numberOfExchanges).format('0,0')}</p>
          <p className="text-gray-600 mt-2"><strong>Approved Supply:</strong> {coin.supply.confirmed ? 'Yes' : 'No'}</p>
          <p className="text-gray-600 mt-2"><strong>Total Supply:</strong> {numeral(coin.supply.total).format('0,0')}</p>
          <p className="text-gray-600 mt-2"><strong>Circulating Supply:</strong> {numeral(coin.supply.circulating).format('0,0')}</p>
      </div>

        </div>

        {/* Price Chart Section */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-semibold text-gray-800">Price Over Time</h3>
          <div>
            <label className="mr-2 text-gray-600">Time Period:</label>
            <select
              value={timePeriod}
              onChange={handleTimePeriodChange}
              className="px-3 py-2 border rounded-md"
            >
              {timePeriods.map((period) => (
                <option key={period} value={period}>
                  {period.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-8">
          <Line data={priceData} options={chartOptions} />
        </div>

        

        {/* Links Section */}
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">{coin.name} Links</h3>
          <p className="text-gray-600"><strong>Website:</strong> <a href={coin.websiteUrl} className="text-blue-500">{coin.websiteUrl}</a></p>
          {coin.links && coin.links.map((link: any) => (
            <p key={link.url} className="text-gray-600 mt-2"><strong>{link.type}:</strong> <a href={link.url} className="text-blue-500">{link.url}</a></p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoinDetail;
