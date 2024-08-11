import React from 'react';
import numeral from 'numeral';
import { Link } from 'react-router-dom';

interface CryptoListProps {
  coins: any[];
  startIndex?: number;
}

const CryptoList: React.FC<CryptoListProps> = ({ coins, startIndex = 0 }) => {
  return (
    <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {coins.map((coin, index) => (
        <li key={coin.uuid} className="bg-white shadow-lg rounded-lg p-4 flex flex-col">
          <Link to={`/coin/${coin.uuid}`}>
            <div className="flex items-center">
              <div className="flex-grow">
                <h4 className="text-lg font-bold text-gray-800">{startIndex + index + 1}. {coin.name}</h4>
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
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CryptoList;
