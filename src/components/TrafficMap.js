import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const TrafficMap = () => {
  const center = [51.505, -0.09];

  const initialTrafficPoints = [
    { id: 1, lat: 51.505, lng: -0.09, name: "Main St & 1st Ave", congestion: 0.7 }, // Orange
    { id: 2, lat: 51.508, lng: -0.1, name: "Central Square", congestion: 0.4 }, // Moved down
    { id: 3, lat: 51.515, lng: -0.09, name: "North Junction", congestion: 0.9 }, // Red
    { id: 4, lat: 51.510, lng: -0.085, name: "River Crossing", congestion: 0.3 } // Moved up
  ];

  const [trafficPoints, setTrafficPoints] = useState(initialTrafficPoints);

  const getCongestionColor = (level) => {
    if (level > 0.8) return 'red';
    if (level > 0.5) return 'orange';
    return 'green';
  };

  // Function to randomly update congestion of one point
  const updateCongestion = () => {
    setTrafficPoints(prevPoints => {
      const indexToUpdate = Math.floor(Math.random() * prevPoints.length);
      const updatedPoints = prevPoints.map((point, index) => {
        if (index === indexToUpdate) {
          return { ...point, congestion: Math.random().toFixed(2) }; // Random congestion between 0.00 to 1.00
        }
        return point;
      });
      return updatedPoints;
    });
  };

  useEffect(() => {
    const interval = setInterval(updateCongestion, 5000); // Update every 5 seconds
    return () => clearInterval(interval); // Clean up on unmount
  }, []);

  return (
    <div className="traffic-map-container" style={{ width: '100%', height: '500px' }}>
      <MapContainer center={center} zoom={14} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {trafficPoints.map(point => (
          <Marker
            key={point.id}
            position={[point.lat, point.lng]}
            icon={L.divIcon({
              className: 'custom-marker',
              html: `<div style="
                background-color: ${getCongestionColor(point.congestion)};
                width: 20px;
                height: 20px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 0 5px rgba(0,0,0,0.5);
              "></div>`,
              iconSize: [20, 20]
            })}
          >
            <Popup>
              <div className="map-popup">
                <h3>{point.name}</h3>
                <p>Congestion: {Math.round(point.congestion * 100)}%</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TrafficMap;
