import React, { useState } from 'react';

const Report = () => {
  const [votes, setVotes] = useState(123); // Initial upvotes
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  // Handle Upvote
  const handleUpvote = () => {
    if (!upvoted) {
      setVotes(downvoted ? votes + 2 : votes + 1);
      setUpvoted(true);
      setDownvoted(false);
    } else {
      setVotes(votes - 1);
      setUpvoted(false);
    }
  };

  // Handle Downvote
  const handleDownvote = () => {
    if (!downvoted) {
      setVotes(upvoted ? votes - 2 : votes - 1);
      setDownvoted(true);
      setUpvoted(false);
    } else {
      setVotes(votes + 1);
      setDownvoted(false);
    }
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl flex">
      {/* Upvote and Downvote Arrows */}
      <div className="flex flex-col items-center justify-center p-4">
        <button
          className={`text-lg ${upvoted ? 'text-green-500' : 'text-gray-600'} hover:text-green-500`}
          onClick={handleUpvote}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <span className="text-xs font-bold my-2">{votes}</span> {/* Upvote count */}
        <button
          className={`text-lg ${downvoted ? 'text-red-500' : 'text-gray-600'} hover:text-red-500`}
          onClick={handleDownvote}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* Report Content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        {/* Photo Preview */}
        <figure className="p-4">
          <img
            src="preview.png"
            alt="Preview"
            className="rounded-lg w-40 h-40 object-cover"
          />
        </figure>

        {/* Text Content */}
        <div className="card-body">
          <h2 className="card-title">Title</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni corrupti nihil tenetur
            non laboriosam porro autem eligendi, veritatis dolores sit, obcaecati doloribus ipsam
            ratione qui possimus vitae nulla sed nam!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Report;
