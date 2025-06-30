// Jasmine

import { useState } from 'react';
import './CreateKudosModal.css';

function CreateKudosModal({ show, onClose }) {
  const API_KEY = import.meta.env.VITE_GIPHY_KEY;

  const [formData, setFormData] = useState({
    gif_url: '',
    title: '',
    description: '',
    owner: '',
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchGifs = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(
          searchTerm
        )}&limit=12&rating=g`
      );
      const data = await response.json();
      setSearchResults(data.data || []);
      setShowSearch(true);
    } catch (error) {
      console.error('Error searching GIFs:', error);
      setShowSearch(false);
    }
    setIsSearching(false);
  };

  const selectGif = (gif) => {
    setFormData((prev) => ({
      ...prev,
      gif_url: gif.images.fixed_height.url,
    }));
    setShowSearch(false);
    setSearchTerm('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Card data:', formData);
    // Handle form submission here
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create a New Card</h3>
        <form onSubmit={handleSubmit}>
          
        {formData.gif_url && (
          <div className="gif-preview">
            <h4>GIF Preview</h4>
            <img src={formData.gif_url} alt="Selected GIF" />
          </div>
        )}

          <div className="form-group">
            <label className="gif_search">Search for GIF</label>
            <div className="search-group">
              <input
                type="text"
                id="searchTerm"
                name="searchTerm"
                value={searchTerm}
                onChange={handleSearchInputChange}
                placeholder="Enter keyword"
              />
              <button
                type="button"
                className="search-btn"
                onClick={searchGifs}
                disabled={isSearching}
              >
                {isSearching ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>

          {showSearch && searchResults.length > 0 && (
            <div className="gif-grid">
              {searchResults.map((gif) => (
                <img
                  key={gif.id}
                  src={gif.images.fixed_height.url}
                  alt={gif.title}
                  onClick={() => selectGif(gif)}
                  className="gif-thumbnail"
                />
              ))}
            </div>
          )}

          <div className="form-group">
            <label className="gif_url">Enter Gif URL</label>
            <input
              type="url"
              id="gif_url"
              name="gif_url"
              value={formData.gif_url}
              onChange={handleInputChange}
              placeholder="Enter GIF URL"
              readOnly
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
            <label className="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="owner">Owner</label>
            <input
              type="text"
              id="owner"
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              Create Card
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateKudosModal;
