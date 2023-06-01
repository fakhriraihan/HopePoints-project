import React, { useEffect, useState } from 'react';

const News = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = '4427f938bac14e4faa6ad8c2d5d7b0a0';
        const keyword = 'kekerasan';
        const url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${apiKey}`;
        const response = await fetch(url);
        const data = await response.json();
        const fetchedArticles = data.articles;
        setArticles(fetchedArticles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div>
      {articles.map((article, index) => (
        <div key={index}>
          <img src={article.urlToImage} alt={article.title} />
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Baca Artikel
          </a>
        </div>
      ))}
    </div>
  );
};

export default News;
