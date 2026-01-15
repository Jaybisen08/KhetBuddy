
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  ReferenceLine,
  Legend
} from 'recharts';
import { MandiPrice } from '../types';

interface Props {
  data: MandiPrice[];
  cropName: string;
}

const MandiPriceChart: React.FC<Props> = ({ data, cropName }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-stone-800">
          <i className="fas fa-chart-line mr-2 text-emerald-600"></i>
          {cropName} Price Forecast (₹/Quintal)
        </h3>
        <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm font-medium">
          ML Predicted
        </span>
      </div>
      <ResponsiveContainer width="100%" height="80%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f5f5" />
          <XAxis dataKey="date" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="price" 
            stroke="#059669" 
            strokeWidth={3} 
            dot={{ r: 4 }} 
            activeDot={{ r: 8 }}
            name="Market Price"
          />
          <ReferenceLine x={data.find(d => d.predicted)?.date} stroke="#dc2626" label="Prediction Start" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
      <p className="text-xs text-stone-400 mt-4 italic">
        *Based on simulated Random Forest regression using local Mandi data.
      </p>
    </div>
  );
};

export default MandiPriceChart;
