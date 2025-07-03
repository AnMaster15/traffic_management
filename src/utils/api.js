// Mock API functions - replace with actual API calls
export const fetchTrafficData = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    intersections: [
      { id: 1, lat: 51.505, lng: -0.09, name: "Main St & 1st Ave", congestion: 0.7, avgSpeed: 25 },
      { id: 2, lat: 51.51, lng: -0.1, name: "Central Square", congestion: 0.4, avgSpeed: 40 },
      { id: 3, lat: 51.515, lng: -0.09, name: "North Junction", congestion: 0.9, avgSpeed: 15 }
    ],
    lastUpdated: new Date().toISOString()
  };
};

export const fetchAnalytics = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    average_speed: 32,
    target_speed: 40,
    average_wait_time: 45,
    target_wait_time: 30,
    congestion_level: 0.65,
    target_congestion: 0.5,
    system_uptime: 99.8,
    incidents_today: 8
  };
};

export const fetchCameras = async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return [
    { id: 1, location: "Main St & 1st Ave", url: "cam1", isActive: true },
    { id: 2, location: "Central Square", url: "cam2", isActive: true },
    { id: 3, location: "North Junction", url: "cam3", isActive: false }
  ];
};

export const submitComplaint = async (complaint) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Complaint submitted:', complaint);
  return { success: true };
};

export const adjustTrafficLights = async (params) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Traffic lights adjusted:', params);
  return { success: true };
};