import React from 'react';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const {authenticatedUser} = useAuthStore();
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
          <h2 className="card-title text-center w-full flex justify-center items-center">
            {authenticatedUser.username}
          </h2>

          <div className="card-actions justify-center">
            <div className="stats shadow flex flex-wrap justify-center gap-2">
              <div className="stat w-28 p-2">
                <div className="stat-title text-xs">Score</div>
                <div className="stat-value text-sm">{authenticatedUser.score}</div>
                <div className="stat-desc text-xs"> </div>
              </div>

              <div className="stat w-28 p-2">
                <div className="stat-title text-xs">Streaks</div>
                <div className="stat-value text-sm">{authenticatedUser.streak}</div>
                <div className="stat-desc text-xs"> </div>
              </div>

              <div className="stat w-28 p-2">
                <div className="stat-title text-xs">Registered Date</div>
                <div className="stat-value text-sm">{authenticatedUser.createdAt}</div>
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
