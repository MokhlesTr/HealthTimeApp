/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

const BlogCard = ({ article }) => {
  return (
    <div className="my-8 m-2 lg:w-96 w-full h-auto p-4 border border-gray-300 bg-white shadow-lg rounded-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
      <div>
        {article.urlToImage && (
          <img
            className="w-full aspect-video rounded-t-lg"
            src={article.urlToImage}
            alt="Blog Image"
          />
        )}
        {article.title && (
          <h2 className="text-md text-center lg:text-left text-blue-900 transition-colors duration-700 hover:text-black font-semibold mt-2">
            {article.title}
          </h2>
        )}
        {article.publishedAt && (
          <p className="text-sm text-right">{article.publishedAt}</p>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
