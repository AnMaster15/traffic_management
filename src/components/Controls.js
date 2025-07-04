import React, { useState } from 'react';
import '../styles/Controls.css';

const Controls = ({ onAdjustLights }) => {
  const [controlParams, setControlParams] = useState({
    intersection: '',
    mode: 'auto',
    duration: 60,
    emergency: false
  });
  const [isActive, setIsActive] = useState(false);

  // Track the current status for each intersection
  const [statusMap, setStatusMap] = useState({
    'main-1st': 'auto',
    'central-square': 'auto',
    'north-junction': 'manual',
    'river-crossing': 'emergency'
  });

  const intersectionNames = {
    'main-1st': 'Main St & 1st Ave',
    'central-square': 'Central Square',
    'north-junction': 'North Junction',
    'river-crossing': 'River Crossing'
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setControlParams(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsActive(true);

    // Update status map dynamically
    const newStatusMap = { ...statusMap };
    const { intersection, mode, emergency } = controlParams;

    if (intersection) {
      if (emergency) {
        newStatusMap[intersection] = 'emergency';
      } else {
        newStatusMap[intersection] = mode;
      }
      setStatusMap(newStatusMap);
    }

    // onAdjustLights(controlParams); // You can uncomment if needed.

    // Reset active status after 3 seconds
    setTimeout(() => setIsActive(false), 3000);
  };

  return (
    <div className="controls-container">
      <h2 className="section-title">Traffic Light Controls</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="intersection">Intersection</label>
          <select
            id="intersection"
            name="intersection"
            value={controlParams.intersection}
            onChange={handleChange}
            required
          >
            <option value="">Select intersection</option>
            <option value="main-1st">Main St & 1st Ave</option>
            <option value="central-square">Central Square</option>
            <option value="north-junction">North Junction</option>
            <option value="river-crossing">River Crossing</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="mode">Control Mode</label>
          <select
            id="mode"
            name="mode"
            value={controlParams.mode}
            onChange={handleChange}
            required
          >
            <option value="auto">Automatic (AI)</option>
            <option value="timed">Timed Sequence</option>
            <option value="manual">Manual Override</option>
          </select>
        </div>

        {controlParams.mode === 'timed' && (
          <div className="form-group">
            <label htmlFor="duration">Green Light Duration (sec)</label>
            <input
              type="range"
              id="duration"
              name="duration"
              min="30"
              max="120"
              step="5"
              value={controlParams.duration}
              onChange={handleChange}
            />
            <span className="duration-value">{controlParams.duration} seconds</span>
          </div>
        )}

        <div className="form-group checkbox-group">
          <input
            type="checkbox"
            id="emergency"
            name="emergency"
            checked={controlParams.emergency}
            onChange={handleChange}
          />
          <label htmlFor="emergency">Emergency Vehicle Priority</label>
        </div>

        <div className="control-actions">
          <button
            type="submit"
            className={isActive ? 'active' : ''}
            disabled={isActive}
          >
            {isActive ? 'Adjusting...' : 'Adjust Traffic Lights'}
          </button>
        </div>
      </form>

      <div className="control-status">
        <h3>Current Status</h3>
        <ul>
          {Object.entries(statusMap).map(([intersectionKey, status]) => (
            <li key={intersectionKey}>
              <span className="status-label">{intersectionNames[intersectionKey]}:</span>
              <span className={`status-value ${status}`}>{formatStatus(status)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Utility to format status for display
const formatStatus = (status) => {
  switch (status) {
    case 'auto':
      return 'Automatic';
    case 'manual':
      return 'Manual Override';
    case 'timed':
      return 'Timed Sequence';
    case 'emergency':
      return 'Emergency Mode';
    default:
      return status;
  }
};

export default Controls;
