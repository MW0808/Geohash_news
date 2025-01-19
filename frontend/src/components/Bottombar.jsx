import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Bottombar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [userInput, setUserInput] = useState(''); 
  const navigate = useNavigate();

  const handlePostClick = () => {
    setIsModalOpen(true); 
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value); 
  };

  const handleSubmit = () => {
    console.log('User input:', userInput); 
    setIsModalOpen(false); 
    setUserInput(''); 
  };

  return (
    <>
      <div className="btm-nav flex justify-center space-x-4 bg-base-100 border-t border-gray-300 fixed bottom-0 w-full">
        <button onClick={() => navigate('/newsletter')}>
          <FontAwesomeIcon icon={faNewspaper} className="h-6 w-6 text-black" />
          <span className="btm-nav-label">Newsletter</span>
        </button>

        <button onClick={handlePostClick}>
          <FontAwesomeIcon icon={faPlus} className="h-6 w-6 text-black" />
          <span className="btm-nav-label">Post</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Create a Post</h2>
            <textarea
              className="w-full h-10 border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Enter your title"
              value={userInput}
              onChange={handleInputChange}
            ></textarea>

            <textarea
              className="w-full h-20 border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Enter your description"
              value={userInput}
              onChange={handleInputChange}
            ></textarea>

            <input type="file" className="file-input file-input-bordered file-input-sm w-full max-w-xs" />  
            
            <div className="flex justify-end space-x-4 mt-4">
            <button
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
            >
                Cancel
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
            </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Bottombar;
