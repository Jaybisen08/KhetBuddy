
import { MandiPrice } from '../types';

/**
 * Simulates a Random Forest regression for crop prices.
 * Real implementation would involve features like rainfall, historical price, and seasonality.
 */
export const fetchMandiPrices = async (crop: string): Promise<MandiPrice[]> => {
  const data: MandiPrice[] = [];
  const basePrice = crop === 'Tomato' ? 1200 : crop === 'Wheat' ? 2100 : 3500;
  
  // Historical data (Last 10 days)
  for (let i = 10; i > 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      price: basePrice + Math.random() * 200 - 100,
      predicted: false
    });
  }

  // Predicted data (Next 5 days)
  for (let i = 0; i < 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    // Add seasonal trend + random noise
    const trend = Math.sin(i * 0.5) * 150;
    data.push({
      date: date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      price: basePrice + trend + Math.random() * 50,
      predicted: true
    });
  }

  return data;
};
