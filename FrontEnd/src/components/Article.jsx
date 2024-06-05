import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Article = () => {
  const { index } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=4793673704b04e279032f351a090a9f9&pageSize=20`
        );
        if (response.ok) {
          const data = await response.json();
          const filteredArticles = data.articles.filter(
            (article) =>
              article.urlToImage && article.title && article.description
          );
          if (filteredArticles.length > index) {
            // Check if the article exists in the filtered list
            setArticle(filteredArticles[index]);
          } else {
            // Redirect to blog if article not found
            window.location.href = "/blog";
          }
        } else {
          throw new Error("Failed to fetch article");
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    fetchArticle();
  }, [index]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-8 ">
      <h1 className="text-3xl mt-24 text-center">{article.title}</h1>
      <div className="flex justify-center gap-8 mt-8 ">
        <div className="max-w-3xl w-full bg-white rounded-lg shadow-xl p-8 hover:shadow-xl transition duration-300">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {article.title}
          </h2>
          <div className="flex items-center mb-4">
            <img
              src={`https://i.pravatar.cc/50?u=${article.author}`}
              alt={article.author}
              className="rounded-full w-8 h-8 mr-2 "
            />
            <p className="text-sm text-gray-600">{article.author}</p>
          </div>
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-64 object-cover border hover:border-gray-600 rounded-lg mb-4"
          />

          {/* Additional attributes and content */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Additional Information
            </h3>
            <p className="text-gray-800">
              Author: {article.author}
              <br />
              Published At: {article.publishedAt}
              <br />
              Source: {article.source.name}
              <br />
              {/* Add more attributes here */}
            </p>
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 bg-blue-300 shadow-xl hover:bg-blue-400 transition duration-300 p-8 overflow-y-auto rounded-xl">
          <h1 className="font-semibold text-white text-3xl">Description:</h1>
          <br />
          <p className="text-lg text-black">{article.description}</p>
          <h1 className="font-semibold text-white text-3xl mt-8">Content:</h1>
          <br />
          <p className="text-black text-lg">{article.content}</p>
        </div>
      </div>
      <div className="flex flex-row justify-center mt-8 gap-8">
        <Link
          to="/blog"
          className="text-blue-600  mx-2 my-2 rounded  hover:font-semibold transition duration-1000"
        >
          Back to Blogs
        </Link>
      </div>
    </div>
  );
};

export default Article;
