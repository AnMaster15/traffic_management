import React from 'react';
import '../styles/StatusAlerts.css';

const StatusAlerts = ({ alerts, onDismiss }) => {
  if (alerts.length === 0) return null;

  return (
    <div className="alerts-container">
      {alerts.map(alert => (
        <div 
          key={alert.id} 
          className={`alert ${alert.type}`}
          onClick={() => onDismiss(alert.id)}
        >
          <div className="alert-content">
            <span className="alert-message">{alert.message}</span>
            <button className="alert-close">&times;</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatusAlerts;