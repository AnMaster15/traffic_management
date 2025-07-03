import React from 'react';
import '../styles/KpiCards.css';

const KpiCards = ({ kpis }) => {
  const formatValue = (value, type) => {
    switch(type) {
      case 'speed': return `${value.toFixed(1)} km/h`;
      case 'time': return `${value.toFixed(1)} min`;
      case 'percentage': return `${value.toFixed(1)}%`;
      case 'liters': return `${Math.round(value)} L`;
      case 'minutes': return `${value.toFixed(1)} min`;
      default: return value;
    }
  };

  const getProgressColor = (current, target, inverse = false) => {
    const percentage = (current / target) * 100;
    if (inverse) {
      return percentage < 70 ? 'good' : percentage < 90 ? 'warning' : 'bad';
    }
    return percentage > 90 ? 'good' : percentage > 70 ? 'warning' : 'bad';
  };

  return (
    <div className="kpi-container">
      <div className="kpi-card">
        <h3>Traffic Flow Efficiency</h3>
        <div className="kpi-value">
          {formatValue(kpis.averageSpeed.current, 'speed')}
          <span className="target">Target: {formatValue(kpis.averageSpeed.target, 'speed')}</span>
        </div>
        <div className={`progress-bar ${getProgressColor(kpis.averageSpeed.current, kpis.averageSpeed.target)}`}
             style={{ width: `${Math.min(100, (kpis.averageSpeed.current / kpis.averageSpeed.target) * 100)}%` }}>
        </div>
      </div>

      <div className="kpi-card">
        <h3>Waiting Time</h3>
        <div className="kpi-value">
          {formatValue(kpis.waitingTime.current, 'time')}
          <span className="target">Target: {formatValue(kpis.waitingTime.target, 'time')}</span>
        </div>
        <div className={`progress-bar ${getProgressColor(kpis.waitingTime.current, kpis.waitingTime.target, true)}`}
             style={{ width: `${Math.min(100, (kpis.waitingTime.current / kpis.waitingTime.target) * 100)}%` }}>
        </div>
      </div>

      <div className="kpi-card">
        <h3>Congestion Level</h3>
        <div className="kpi-value">
          {formatValue(kpis.congestionLevel.current, 'percentage')}
          <span className="target">Target: ≤{formatValue(kpis.congestionLevel.target, 'percentage')}</span>
        </div>
        <div className={`progress-bar ${getProgressColor(kpis.congestionLevel.current, kpis.congestionLevel.target, true)}`}
             style={{ width: `${Math.min(100, kpis.congestionLevel.current)}%` }}>
        </div>
      </div>

      <div className="kpi-card">
        <h3>Incident Detection</h3>
        <div className="kpi-value">
          {formatValue(kpis.incidentDetection.current, 'minutes')}
          <span className="target">Target: ≤{formatValue(kpis.incidentDetection.target, 'minutes')}</span>
        </div>
        <div className={`progress-bar ${getProgressColor(kpis.incidentDetection.current, kpis.incidentDetection.target, true)}`}
             style={{ width: `${Math.min(100, (kpis.incidentDetection.current / kpis.incidentDetection.target) * 100)}%` }}>
        </div>
      </div>

      <div className="kpi-card">
        <h3>Fuel Savings</h3>
        <div className="kpi-value">
          {formatValue(kpis.fuelSavings.current, 'liters')}
          <span className="target">Target: ≥{formatValue(kpis.fuelSavings.target, 'liters')}</span>
        </div>
        <div className={`progress-bar ${getProgressColor(kpis.fuelSavings.current, kpis.fuelSavings.target)}`}
             style={{ width: `${Math.min(100, (kpis.fuelSavings.current / kpis.fuelSavings.target) * 100)}%` }}>
        </div>
      </div>

      <div className="kpi-card">
        <h3>System Uptime</h3>
        <div className="kpi-value">
          {formatValue(kpis.uptime.current, 'percentage')}
          <span className="target">Target: ≥{formatValue(kpis.uptime.target, 'percentage')}</span>
        </div>
        <div className={`progress-bar ${getProgressColor(kpis.uptime.current, kpis.uptime.target)}`}
             style={{ width: `${Math.min(100, kpis.uptime.current)}%` }}>
        </div>
      </div>

      <div className="kpi-card">
        <h3>User Satisfaction</h3>
        <div className="kpi-value">
          {formatValue(kpis.satisfaction.current, 'percentage')}
          <span className="target">Target: ≥{formatValue(kpis.satisfaction.target, 'percentage')}</span>
        </div>
        <div className={`progress-bar ${getProgressColor(kpis.satisfaction.current, kpis.satisfaction.target)}`}
             style={{ width: `${Math.min(100, kpis.satisfaction.current)}%` }}>
        </div>
      </div>
    </div>
  );
};

export default KpiCards;