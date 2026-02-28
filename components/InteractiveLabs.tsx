
import React, { useState } from 'react';

interface LabProps {
  labId: string;
}

export const PressureLab: React.FC = () => {
  const [force, setForce] = useState(10);
  const [area, setArea] = useState(2);
  const pressure = area > 0 ? (force / area).toFixed(2) : 0;

  return (
    <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
      <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
        💧 Fluid Pressure Calculator
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Applied Force (N)</label>
          <input 
            type="range" 
            min="1" max="100" 
            value={force} 
            onChange={(e) => setForce(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
          <span className="text-blue-700 font-bold">{force} N</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Piston Area (m²)</label>
          <input 
            type="range" 
            min="0.5" max="10" step="0.5"
            value={area} 
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer mt-2"
          />
          <span className="text-blue-700 font-bold">{area} m²</span>
        </div>
      </div>
      <div className="mt-6 p-4 bg-white rounded-lg border border-blue-100 text-center">
        <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Resulting Pressure (P)</div>
        <div className="text-3xl font-black text-blue-600">{pressure} Pa</div>
      </div>
    </div>
  );
};

export const KalmanFilterDemo: React.FC = () => {
  return (
    <div className="p-6 bg-purple-50 border border-purple-200 rounded-xl">
      <h4 className="text-lg font-bold mb-4">🤖 Signal Processing Lab</h4>
      <div className="h-32 flex items-center justify-center bg-white rounded border border-purple-100 italic text-purple-400">
        [Interactive Waveform Visualizer Placeholder]
      </div>
      <p className="mt-4 text-sm text-purple-800">
        In this module, you would adjust variance parameters to see how the Kalman Filter smoothes noisy sensor data.
      </p>
    </div>
  );
};

const LabRegistry: Record<string, React.FC> = {
  'pressure-calculator': PressureLab,
  'kalman-filter-demo': KalmanFilterDemo,
};

export const LabRenderer: React.FC<LabProps> = ({ labId }) => {
  const LabComponent = LabRegistry[labId];
  if (!LabComponent) return <div className="p-4 bg-red-50 text-red-500">Lab {labId} not found.</div>;
  return <LabComponent />;
};
