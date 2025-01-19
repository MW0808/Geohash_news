import React, { useEffect, useState } from 'react';
import { useReportStore } from '../store/useReportStore';
import { useAuthStore } from '../store/useAuthStore';

const Report = (props) => {
  const [votes, setVotes] = useState(props.score); 
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const {upvote, downvote} = useReportStore();
  const {authenticatedUser} = useAuthStore();

  const handleUpvote = async () => {
    if (!authenticatedUser) return;
    if (!upvoted) {
      setVotes(downvoted ? votes + 2 : votes + 1);
      setUpvoted(true);
      setDownvoted(false);
      upvote(props._id)
    } else {
      setVotes(votes - 1);
      setUpvoted(false);
      downvote(props._id)
    }
  };

  const handleDownvote = async () => {
    if (!authenticatedUser) return;
    if (!downvoted) {
      setVotes(upvoted ? votes - 2 : votes - 1);
      setDownvoted(true);
      setUpvoted(false);
      downvote(props._id)
    } else {
      setVotes(votes + 1);
      setDownvoted(false);
      upvote(props._id);
    }
  };

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl flex">
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
        <span className="text-xs font-bold my-2">{votes}</span> {}
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

      <div className="flex flex-col lg:flex-row items-center lg:items-start">
        <figure className="p-4">
          <img
            src={props.image || "preview.png"}
            alt="Preview"
            className="rounded-lg w-40 h-40 object-cover"
          />
        </figure>

        <div className="card-body">
          <h2 className="card-title">{props.title}</h2>
          <p>
            {props.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Report;
