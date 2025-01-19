import React from 'react';

const ProfilePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card card-compact bg-base-100 w-96 shadow-xl">
        <figure>
          <img
            src="userprofile.jpg"
            alt="User Name"
          />
        </figure>
        <div className="card-body">
          {/* Centered Username */}
          <h2 className="card-title text-center w-full flex justify-center items-center">
            UserName
          </h2>

          {/* Resized Stats */}
          <div className="card-actions justify-center">
            <div className="stats shadow flex flex-wrap justify-center gap-2">
              <div className="stat w-28 p-2">
                <div className="stat-title text-xs">Score</div>
                <div className="stat-value text-sm">0</div>
                <div className="stat-desc text-xs"> </div>
              </div>

              <div className="stat w-28 p-2">
                <div className="stat-title text-xs">Streaks</div>
                <div className="stat-value text-sm">1</div>
                <div className="stat-desc text-xs"> </div>
              </div>

              <div className="stat w-28 p-2">
                <div className="stat-title text-xs">Registered Date</div>
                <div className="stat-value text-sm">2025.01.18</div>
                <div className="stat-desc text-xs"> </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
