import React, { useState, useEffect } from 'react';
import '../styles/CameraFeed.css';

const CameraFeed = ({ camera, onSelectCamera }) => {
  const [cameras, setCameras] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        // Replace with actual API call
        const response = await fetch('/api/cameras');
        const data = await response.json();
        setCameras(data);
        if (data.length > 0 && !camera) {
          onSelectCamera(data[0]);
        }
      } catch (error) {
        console.error('Error fetching cameras:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCameras();
  }, []);

  if (isLoading) {
    return <div className="camera-loading">Loading cameras...</div>;
  }

  if (cameras.length === 0) {
    return <div className="camera-error">No cameras available</div>;
  }

  return (
    <div className="camera-feed-container">
      <h2 className="section-title">Live Camera Feed</h2>
      
      <div className="camera-selector">
        <select
          value={camera?.id || ''}
          onChange={(e) => {
            const selected = cameras.find(c => c.id === parseInt(e.target.value));
            onSelectCamera(selected);
          }}
        >
          {cameras.map(cam => (
            <option key={cam.id} value={cam.id}>
              {cam.location} {cam.isActive ? '' : '(Offline)'}
            </option>
          ))}
        </select>
      </div>

      <div className="video-container">
        {camera ? (
          <>
            <div className="video-placeholder">
              {/* In a real app, you would use a proper video stream component */}
              <img 
                src={`https://placehold.co/600x400/333/fff?text=${encodeURIComponent(camera.location)}`} 
                alt={`Live feed from ${camera.location}`}
              />
              <div className="camera-info">
                <span>{camera.location}</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
            <div className="camera-controls">
              <button>Snapshot</button>
              <button>Fullscreen</button>
            </div>
          </>
        ) : (
          <div className="no-camera-selected">
            Please select a camera from the dropdown
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraFeed;