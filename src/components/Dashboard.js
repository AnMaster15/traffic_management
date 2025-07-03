import React, { useState, useEffect } from 'react';
import TrafficMap from './TrafficMap';
import KpiCards from './KpiCards';
import AnalyticsCharts from './AnalyticsCharts';
import Controls from './Controls';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [trafficData, setTrafficData] = useState(null);
  const [kpis, setKpis] = useState({
    averageSpeed: { current: 0, target: 40 },
    waitingTime: { current: 0, target: 30 },
    congestionLevel: { current: 0, target: 50 },
    incidentDetection: { current: 0, target: 2 },
    fuelSavings: { current: 0, target: 500 },
    uptime: { current: 0, target: 99 },
    satisfaction: { current: 0, target: 90 }
  });
  const [timeSeriesData, setTimeSeriesData] = useState([]);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = () => {
      // Generate mock KPI data
      setKpis({
        averageSpeed: { current: 32 + Math.random() * 8, target: 40 },
        waitingTime: { current: 25 + Math.random() * 10, target: 30 },
        congestionLevel: { current: 45 + Math.random() * 20, target: 50 },
        incidentDetection: { current: 1.5 + Math.random(), target: 2 },
        fuelSavings: { current: 420 + Math.random() * 100, target: 500 },
        uptime: { current: 99.5 + Math.random(), target: 99 },
        satisfaction: { current: 85 + Math.random() * 10, target: 90 }
      });

      // Generate time series data for charts
      const now = new Date();
      const newTimeSeriesData = [...Array(24)].map((_, i) => {
        const hour = new Date(now);
        hour.setHours(now.getHours() - 23 + i);
        return {
          time: hour.toLocaleTimeString([], { hour: '2-digit' }),
          speed: 25 + Math.random() * 25,
          volume: 100 + Math.random() * 400,
          incidents: Math.floor(Math.random() * 5)
        };
      });
      setTimeSeriesData(newTimeSeriesData);

      // Traffic map data
      setTrafficData({
        intersections: [
          { id: 1, lat: 51.505, lng: -0.09, name: "Main Intersection", congestion: 0.7 },
          { id: 2, lat: 51.51, lng: -0.1, name: "Central Square", congestion: 0.4 },
          { id: 3, lat: 51.515, lng: -0.09, name: "North Junction", congestion: 0.9 }
        ]
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Smart Traffic Management Dashboard</h1>
        <div className="header-info">
          <span>Last updated: {new Date().toLocaleTimeString()} </span>
          <span>System status: <span className="status-active">Operational</span></span>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="map-section">
          <TrafficMap data={trafficData} />
        </section>

        <section className="kpi-section">
          <KpiCards kpis={kpis} />
        </section>

        <section className="analytics-section">
          <AnalyticsCharts kpis={kpis} timeSeriesData={timeSeriesData} />
        </section>

        <section className="controls-section">
          <Controls />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;