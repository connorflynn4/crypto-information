import React, { useEffect, useState } from 'react';
import { fetchNews } from '../api/newsService';
import { ClipLoader } from 'react-spinners';

const News: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [visibleNews, setVisibleNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const getNews = async () => {
      try {
        const articles = await fetchNews();
        setNews(articles);
        setVisibleNews(articles.slice(0, 10)); // Show only the first 10 articles initially
        setLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
        setLoading(false);
      }
    };

    getNews();
  }, []);

  const loadMoreNews = () => {
    setVisibleNews(news); // Show all articles
    setHasMore(false); // Hide the "Load More" button
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

  return (
    <section className="bg-white px-4 py-12">
      <div className="max-w-screen-lg mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Latest Cryptocurrency News</h2>
          <p className="mt-4 text-gray-500 sm:text-lg">
            Stay updated with the latest trends and news in the cryptocurrency world. Explore the most recent articles from trusted sources.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleNews.map((article, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={article.thumbnail} alt={article.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-4">{article.description}</p>
                <p className="text-gray-500 text-sm">{new Date(article.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={loadMoreNews}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default News;
