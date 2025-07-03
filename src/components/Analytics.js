import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import '../styles/Analytics.css';

const Analytics = ({ data }) => {
  if (!data) {
    return <div className="analytics-loading">Loading analytics data...</div>;
  }

  // Prepare data for charts
  const kpiData = [
    { name: 'Avg Speed', current: data.average_speed, target: data.target_speed },
    { name: 'Wait Time', current: data.average_wait_time, target: data.target_wait_time },
    { name: 'Congestion', current: data.congestion_level * 100, target: data.target_congestion * 100 },
    { name: 'Uptime', current: data.system_uptime, target: 99 }
  ];

  const timeSeriesData = [
    { hour: '00:00', speed: 45, volume: 120 },
    { hour: '03:00', speed: 50, volume: 80 },
    { hour: '06:00', speed: 35, volume: 300 },
    { hour: '09:00', speed: 25, volume: 450 },
    { hour: '12:00', speed: 30, volume: 400 },
    { hour: '15:00', speed: 35, volume: 380 },
    { hour: '18:00', speed: 28, volume: 420 },
    { hour: '21:00', speed: 40, volume: 200 }
  ];

  const incidentData = [
    { name: 'Accidents', value: 5 },
    { name: 'Congestion', value: 25 },
    { name: 'Signals', value: 3 },
    { name: 'Other', value: 7 }
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="analytics-container">
      <h2 className="section-title">Traffic Analytics</h2>
      
      <div className="kpi-summary">
        <div className="kpi-card">
          <h3>Average Speed</h3>
          <p className="kpi-value">{data.average_speed} <span>km/h</span></p>
          <p className="kpi-target">Target: {data.target_speed} km/h</p>
          <div className={`kpi-trend ${data.average_speed >= data.target_speed ? 'positive' : 'negative'}`}>
            {data.average_speed >= data.target_speed ? '✓ Meeting target' : '✗ Below target'}
          </div>
        </div>
        
        <div className="kpi-card">
          <h3>Wait Time</h3>
          <p className="kpi-value">{data.average_wait_time} <span>sec</span></p>
          <p className="kpi-target">Target: {data.target_wait_time} sec</p>
          <div className={`kpi-trend ${data.average_wait_time <= data.target_wait_time ? 'positive' : 'negative'}`}>
            {data.average_wait_time <= data.target_wait_time ? '✓ Meeting target' : '✗ Above target'}
          </div>
        </div>
        
        <div className="kpi-card">
          <h3>Congestion</h3>
          <p className="kpi-value">{Math.round(data.congestion_level * 100)}<span>%</span></p>
          <p className="kpi-target">Target: ≤{Math.round(data.target_congestion * 100)}%</p>
          <div className={`kpi-trend ${data.congestion_level <= data.target_congestion ? 'positive' : 'negative'}`}>
            {data.congestion_level <= data.target_congestion ? '✓ Meeting target' : '✗ Above target'}
          </div>
        </div>
      </div>
      
      <div className="charts-row">
        <div className="chart-container">
          <h4>Performance vs Targets</h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={kpiData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="current" fill="#8884d8" name="Current" />
              <Bar dataKey="target" fill="#82ca9d" name="Target" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-container">
          <h4>Daily Traffic Pattern</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="speed" stroke="#8884d8" name="Speed (km/h)" />
              <Line yAxisId="right" type="monotone" dataKey="volume" stroke="#82ca9d" name="Volume (vehicles)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="charts-row">
        <div className="chart-container">
          <h4>Incident Types</h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={incidentData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {incidentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="stats-container">
          <h4>System Statistics</h4>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">System Uptime</span>
              <span className="stat-value">{data.system_uptime}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Sensors Active</span>
              <span className="stat-value">24/25</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Cameras Online</span>
              <span className="stat-value">8/10</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Response Time</span>
              <span className="stat-value">4.2 min</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Complaints Today</span>
              <span className="stat-value">12</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Fuel Saved</span>
              <span className="stat-value">420 L</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;