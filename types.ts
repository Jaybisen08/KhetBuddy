
export type Language = 'en' | 'hi' | 'mr' | 'ta' | 'te' | 'pa' | 'ml';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface MandiPrice {
  date: string;
  price: number;
  predicted?: boolean;
}

export interface CropAdvisory {
  crop: string;
  status: 'Healthy' | 'Warning' | 'Critical';
  advice: string;
  nextSteps: string[];
}

export interface ToolItem {
  id: string;
  name: string;
  owner: string;
  pricePerDay: number;
  available: boolean;
  distance: string;
  category: 'Tractor' | 'Plow' | 'Sprayer' | 'Harvester' | 'Rotavator' | 'Seed Drill';
  contactNumber?: string;
  address?: string;
}

export interface Notification {
  id: string;
  title: string;
  description: string;
  type: 'weather' | 'price' | 'system';
  timestamp: string;
}

export enum AppSection {
  Landing = 'landing',
  Dashboard = 'dashboard',
  Prices = 'prices',
  Chat = 'chat',
  Diagnostic = 'diagnostic',
  Rental = 'rental',
  Tracking = 'tracking',
  CropDetail = 'crop_detail',
  Profile = 'profile',
  SarkariYojana = 'sarkari_yojana',
  Weather = 'weather'
}
