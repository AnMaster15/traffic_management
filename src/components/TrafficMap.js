import React from 'react';
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

const TrafficMap = ({ data }) => {
  // Default coordinates (center of the map)
  const center = [51.505, -0.09]; // Example coordinates (London)
  
  // Mock traffic data - replace with real data from props
  const trafficPoints = data?.intersections || [
    { id: 1, lat: 51.505, lng: -0.09, name: "Main Intersection", congestion: 0.7 },
    { id: 2, lat: 51.51, lng: -0.1, name: "Central Square", congestion: 0.4 },
    { id: 3, lat: 51.515, lng: -0.09, name: "North Junction", congestion: 0.9 }
  ];

  const getCongestionColor = (level) => {
    if (level > 0.8) return 'red';
    if (level > 0.5) return 'orange';
    return 'green';
  };

  return (
    <div className="traffic-map-container">
      <MapContainer 
        center={center} 
        zoom={13} 
        style={{ height: '100%', width: '100%' }}
      >
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
              html: `<div style="background-color: ${getCongestionColor(point.congestion)}"></div>`,
              iconSize: [20, 20]
            })}
          >
            <Popup>
              <div className="map-popup">
                <h3>{point.name}</h3>
                <p>Congestion: {Math.round(point.congestion * 100)}%</p>
                <p>Avg Speed: {point.avgSpeed || 'N/A'} km/h</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default TrafficMap;