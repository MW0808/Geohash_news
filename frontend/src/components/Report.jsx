import React from 'react';

const Report = () => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src="preview.png" alt="Preview" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Title</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni corrupti nihil tenetur non laboriosam porro autem eligendi, veritatis dolores sit, obcaecati doloribus ipsam ratione qui possimus vitae nulla sed nam!
        </p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Upvote</button>
          <button className="btn btn-primary">Downvote</button>
          <button className="btn btn-primary">Comment</button>
        </div>
      </div>
    </div>
  );
};

export default Report;
