// Blogs.jsx
import React, { useState, useEffect } from "react";
import BlogCard from "../layouts/BlogCard";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&category=health&apiKey=4793673704b04e279032f351a090a9f9&pageSize=20`
        );
        if (response.ok) {
          const data = await response.json();
          setArticles(
            data.articles.filter(
              (article) =>
                article.urlToImage && article.title && article.description
            )
          );
        } else {
          throw new Error("Failed to fetch articles");
        }
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-8 border-blue-900"></div>
      </div>
    );
  }

  return (
    <div className=" flex flex-col justify-center  px-5 pt-24">
      <div className="flex justify-center flex-col items-center lg:flex-row ">
        <div>
          <h1 className="text-4xl font-semibold my-8  text-center">
            Latest Post
          </h1>
          <p className="mt-2 text-center mb-4">
            Explore our latest insights, trends, and expert opinions on a
            variety of topics.
          </p>
        </div>
      </div>
      {articles.length > articlesPerPage && (
        <div className="flex justify-center">
          {[...Array(Math.ceil(articles.length / articlesPerPage))].map(
            (_, i) => (
              <button
                key={i}
                className={`mx-1 rounded-full w-8 h-8 ${
                  i + 1 === currentPage
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-800"
                }`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 md:m-auto lg:m-auto lg:grid-cols-4 ">
        {currentArticles.map((article, index) => (
          <Link
            key={indexOfFirstArticle + index}
            to={`/article/${indexOfFirstArticle + index}`}
            className="flex justify-center overflow-hidden"
          >
            <BlogCard article={article} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
