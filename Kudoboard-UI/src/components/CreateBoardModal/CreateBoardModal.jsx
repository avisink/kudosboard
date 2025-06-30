//Jasmine 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateBoardModal.css' 
import axios from "axios";
function CreateBoardModal({ show, onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image_url: '',
    title: '',
    category: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  console.log('Board data:', formData);

  // Create a board post request
  try {
    const response = await axios.post("http://localhost:3000/boards", {
      image_url: formData.image_url || undefined,
      title: formData.title,
      category: formData.category,
    });

    const data = response.data; 

    console.log("Board created:", data);

    // Clear form after success
    setFormData({
      image_url: '',
      title: '',
      category: '',
    });

    // Show success message to user
    alert("Board created successfully!");

    // Redirect
    navigate(`/`);

  } catch (error) {
    console.error("Submission failed:", error);
    alert("Failed to create board. Please try again.");
  }
};


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create New Board</h3>
        <form onSubmit={handleSubmit}>

          {formData.image_url && (
            <div className="img-preview">
              <h4>Image Preview</h4>
              <img src={formData.image_url} alt="Selected Image" />
            </div>
          )}

          <div className="form-group">
            <label className="image_url">Image URL</label>
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="form-group">
            <label className="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a category</option>
              <option value="celebration">Celebration</option>
              <option value="thank you">Thank You</option>
              <option value="inspiration">Inspiration</option>
            </select>
          </div>

          {/* <div className="form-group">
            <label className="author">Author</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleInputChange}
              required
            />
          </div> */}

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateBoardModal;