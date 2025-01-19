import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useReportStore } from '../store/useReportStore';

const Bottombar = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: ""
  })
  const [img, setImg] = useState(null);
  const {authenticatedUser} = useAuthStore();
  const {submitReport} = useReportStore();
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const navigate = useNavigate();

  const handlePostClick = () => {
    setIsModalOpen(true); 
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    submitReport({...formData, image: img})
    setIsModalOpen(false); 
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setImg(base64Image);
    }
  };

  return (
    <>
      <div className="btm-nav flex justify-center space-x-4 bg-base-100 border-t border-gray-300 fixed bottom-0 w-full">
        <button onClick={() => navigate('/newsletter')}>
          <FontAwesomeIcon icon={faNewspaper} className="h-6 w-6 text-black" />
          <span className="btm-nav-label">Newsletter</span>
        </button>

        <button onClick={handlePostClick} disabled={!authenticatedUser}>
          <FontAwesomeIcon icon={faPlus} className="h-6 w-6 text-black" />
          <span className="btm-nav-label">Post</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 sm:w-2/3 md:w-1/2 lg:w-1/3">
            <form onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold mb-4">Create a Post</h2>
            <textarea
              className="w-full h-10 border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Enter your title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            ></textarea>

            <textarea
              className="w-full h-20 border border-gray-300 rounded-lg p-2 mb-4"
              placeholder="Enter your description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>

            <input type="file" accept="image/*" className="file-input file-input-bordered file-input-sm w-full max-w-xs" onChange={handleImageUpload} />  
            
            <div className="flex justify-end space-x-4 mt-4">
            <button
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
            >
                Cancel
            </button>
            <button className="btn btn-primary" type='submit'>
                Submit
            </button>
            </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Bottombar;
