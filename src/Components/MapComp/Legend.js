import React from 'react';
import './legend.css';

const HeatmapLegend = () => {
  return (
    <div className="heatmap-legend">
      <div className="heatmap-legend-item">
        <div className="heatmap-legend-color heatmap-legend-color-low"></div>
        <div className="heatmap-legend-label">Low</div>
      </div>
      <div className="heatmap-legend-item">
        <div className="heatmap-legend-color heatmap-legend-color-medium"></div>
        <div className="heatmap-legend-label">Medium</div>
      </div>
      <div className="heatmap-legend-item">
        <div className="heatmap-legend-color heatmap-legend-color-high"></div>
        <div className="heatmap-legend-label">High</div>
      </div>
    </div>
  );
};

export default HeatmapLegend;
