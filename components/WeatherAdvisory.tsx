
import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

interface Advisory {
  crop: string;
  msg: string;
  type: 'warn' | 'alert' | 'info';
  lat: number;
  lng: number;
  temp: number;
  humidity: number;
  windSpeed: number;
  suitability?: string;
}

const indiaCityCoords: Record<string, [number, number]> = {
  'Bhopal': [23.2599, 77.4126],
  'Indore': [22.7196, 75.8577],
  'Delhi': [28.6139, 77.2090],
  'New Delhi': [28.6139, 77.2090],
  'Mumbai': [19.0760, 72.8777],
  'Sehore': [23.2032, 77.0844],
  'Jabalpur': [23.1815, 79.9864],
  'Bangalore': [12.9716, 77.5946],
  'Bengaluru': [12.9716, 77.5946],
  'Chennai': [13.0827, 80.2707],
  'Kolkata': [22.5726, 88.3639],
  'Pune': [18.5204, 73.8567],
  'Hyderabad': [17.3850, 78.4867],
  'Jaipur': [26.9124, 75.7873],
  'Ahmedabad': [23.0225, 72.5714],
  'Lucknow': [26.8467, 80.9462],
  'Vidisha': [23.5239, 77.8133],
  'Ujjain': [23.1760, 75.7885],
  'Sagar': [23.8388, 78.7378],
  'Gwalior': [26.2124, 78.1772],
  'Patna': [25.5941, 85.1376],
  'Ranchi': [23.3441, 85.3096],
  'Guwahati': [26.1445, 91.7362]
};

const weatherZones = [
  { name: 'Heat Wave', color: '#ef4444', description: 'Extreme temperatures above 40°C', center: [25.5, 77.0], radius: 300000 },
  { name: 'Cold Wave', color: '#3b82f6', description: 'Intense cold below 5°C', center: [31.0, 76.0], radius: 250000 },
  { name: 'Heavy Rain', color: '#1e3a8a', description: 'High precipitation area', center: [22.0, 88.0], radius: 200000 },
  { name: 'Thunderstorm', color: '#9333ea', description: 'Active lightning and squalls', center: [23.0, 80.0], radius: 180000 },
  { name: 'Cloudy', color: '#94a3b8', description: 'Heavy overcast conditions', center: [20.0, 73.0], radius: 400000 },
  { name: 'Foggy', color: '#cbd5e1', description: 'Visibility below 500m', center: [28.5, 77.5], radius: 150000 },
  { name: 'Humid', color: '#14b8a6', description: 'High relative humidity > 85%', center: [13.0, 80.0], radius: 220000 },
  { name: 'Cyclonic', color: '#f97316', description: 'Circular wind disturbance', center: [18.0, 84.0], radius: 350000 },
  { name: 'Clear', color: '#10b981', description: 'Optimal farming window', center: [22.7, 75.8], radius: 200000 },
];

const indiaRegions: Advisory[] = [
  { crop: 'Wheat', msg: 'Cold wave incoming.', type: 'warn', lat: 31.1471, lng: 75.3412, temp: 12, humidity: 40, windSpeed: 5, suitability: 'Excellent for Wheat/Mustard' },
  { crop: 'Rice', msg: 'High rainfall expected.', type: 'alert', lat: 22.9868, lng: 87.8550, temp: 30, humidity: 85, windSpeed: 15, suitability: 'Ideal for Rice/Jute' },
  { crop: 'Cotton', msg: 'Dry wind patterns.', type: 'info', lat: 18.5204, lng: 73.8567, temp: 32, humidity: 45, windSpeed: 10, suitability: 'Best for Cotton/Soyabean' },
  { crop: 'Spices', msg: 'Humid conditions.', type: 'info', lat: 10.8505, lng: 76.2711, temp: 28, humidity: 80, windSpeed: 8, suitability: 'Perfect for Spices/Rubber' },
];

const WeatherAdvisory: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode = false }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layerRef = useRef<L.LayerGroup | null>(null);
  const overlayLayerRef = useRef<L.LayerGroup | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const routeRef = useRef<L.Polyline | null>(null);
  
  const [activeLayer, setActiveLayer] = useState('Standard');
  const [searchQuery, setSearchQuery] = useState('');
  const [riskType, setRiskType] = useState('Heat Wave');
  const [route, setRoute] = useState({ from: '', to: '' });
  const [loading, setLoading] = useState(false);
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [farmForm, setFarmForm] = useState({ name: '', location: '' });
  const [routeInfo, setRouteInfo] = useState<any>(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = L.map(mapContainerRef.current, { 
        center: [22.9734, 78.6569], 
        zoom: 5, 
        zoomControl: false, 
        attributionControl: false,
        scrollWheelZoom: true,
        dragging: true,
        tap: true
      });
      tileLayerRef.current = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png').addTo(mapRef.current);
      layerRef.current = L.layerGroup().addTo(mapRef.current);
      overlayLayerRef.current = L.layerGroup().addTo(mapRef.current);
      renderStaticMarkers();

      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (mapRef.current && tileLayerRef.current) {
      let url = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';
      if (activeLayer === 'Satellite') url = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
      if (activeLayer === 'Dark') url = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
      
      tileLayerRef.current.setUrl(url);
    }
  }, [activeLayer]);

  const renderStaticMarkers = () => {
    if (!layerRef.current) return;
    indiaRegions.forEach(region => {
      const icon = L.divIcon({
        className: 'custom-icon',
        html: `<div class="p-2 bg-emerald-700 rounded-full text-white text-[8px] font-black border-2 border-white shadow-xl flex flex-col items-center">
                 <i class="fas fa-leaf mb-0.5"></i>
                 <span>${region.crop}</span>
               </div>`,
        iconSize: [36, 36], iconAnchor: [18, 18]
      });
      L.marker([region.lat, region.lng], { icon }).addTo(layerRef.current!).bindPopup(`
        <div class="p-4 bg-white rounded-xl shadow-2xl min-w-[200px]">
          <h4 class="font-black text-stone-900 text-sm mb-1 uppercase">${region.suitability}</h4>
          <p class="text-[10px] text-stone-500 leading-tight">${region.msg}</p>
        </div>
      `);
    });
  };

  const geocode = (query: string): [number, number] | null => {
    const q = query.trim().toLowerCase();
    const city = Object.keys(indiaCityCoords).find(k => k.toLowerCase() === q);
    if (city) return indiaCityCoords[city];
    return null;
  };

  const handleSearch = () => {
    if (!mapRef.current || !layerRef.current) return;
    const coords = geocode(searchQuery);
    if (coords) {
      markLocation(coords, searchQuery);
    } else {
      alert(`City "${searchQuery}" not found. Displaying center view.`);
      markLocation([22.9, 78.6], searchQuery);
    }
  };

  const markLocation = (coords: [number, number], name: string) => {
    setLoading(true);
    setTimeout(() => {
      mapRef.current?.flyTo(coords, 11, { animate: true, duration: 1.5 });
      const pinIcon = L.divIcon({
        className: 'search-pin',
        html: `<div class="animate-bounce"><i class="fas fa-location-dot text-4xl text-emerald-600 drop-shadow-xl"></i></div>`,
        iconSize: [40, 40], iconAnchor: [20, 40]
      });
      L.marker(coords, { icon: pinIcon }).addTo(layerRef.current!).bindPopup(`
        <div class="p-5 font-sans min-w-[200px] bg-white rounded-3xl">
          <h4 class="text-xl font-black uppercase italic tracking-tighter text-stone-900">${name}</h4>
          <p class="text-emerald-700 font-bold mt-2 text-xs">28°C • Weather Station Tracking</p>
        </div>
      `, { className: 'custom-popup-frame' }).openPopup();
      setLoading(false);
    }, 400);
  };

  const handleAnalyzeZones = () => {
    if (!overlayLayerRef.current || !mapRef.current) return;
    overlayLayerRef.current.clearLayers();
    setLoading(true);
    
    setTimeout(() => {
      const selectedZone = weatherZones.find(z => z.name === riskType);
      if (selectedZone) {
        L.circle(selectedZone.center as [number, number], {
          radius: selectedZone.radius,
          color: selectedZone.color,
          fillColor: selectedZone.color,
          fillOpacity: 0.3,
          weight: 2
        }).addTo(overlayLayerRef.current!).bindTooltip(`<strong>${selectedZone.name} Zone</strong><br/>${selectedZone.description}`, { 
          permanent: true, 
          direction: 'center', 
          className: 'zone-tooltip' 
        });
        
        mapRef.current?.flyTo(selectedZone.center as [number, number], 6, { animate: true });
      } else {
        // Fallback: show all zones if something is wrong
        weatherZones.forEach(zone => {
           L.circle(zone.center as [number, number], {
             radius: zone.radius,
             color: zone.color,
             fillColor: zone.color,
             fillOpacity: 0.2,
             weight: 1
           }).addTo(overlayLayerRef.current!).bindTooltip(zone.name);
        });
      }
      setLoading(false);
    }, 800);
  };

  const resetMap = () => {
    mapRef.current?.setView([22.9734, 78.6569], 5, { animate: true });
    layerRef.current?.clearLayers();
    overlayLayerRef.current?.clearLayers();
    if (routeRef.current) routeRef.current.remove();
    renderStaticMarkers();
    setRouteInfo(null);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-120px)] gap-4 animate-fadeIn font-sans overflow-hidden">
      
      {/* Dynamic Top Control Dashboard */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 p-5 rounded-[2rem] border shadow-xl ${isDarkMode ? 'bg-stone-900 border-white/10' : 'bg-white border-stone-200'} shrink-0`}>
        <div className="space-y-1.5">
          <label className={`text-[8px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Map Theme</label>
          <select value={activeLayer} onChange={e => setActiveLayer(e.target.value)} className={`w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3 text-[11px] font-bold outline-none focus:ring-2 focus:ring-emerald-500 ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'text-stone-900'}`}>
            <option value="Standard">Standard Terrain</option>
            <option value="Satellite">Satellite Mapping</option>
            <option value="Dark">Infrastructure Dark</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className={`text-[8px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Locate City</label>
          <div className="flex gap-2">
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="City name..." className={`flex-1 bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3 text-[11px] font-bold outline-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'text-stone-900'}`} />
            <button onClick={handleSearch} className="bg-emerald-700 text-white w-10 rounded-xl shadow-lg hover:bg-emerald-800 transition-all"><i className="fas fa-search"></i></button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className={`text-[8px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Risk Analysis Zone</label>
          <div className="flex gap-2">
            <select value={riskType} onChange={e => setRiskType(e.target.value)} className={`flex-1 bg-stone-50 border border-stone-200 rounded-xl py-2.5 px-3 text-[11px] font-bold outline-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'text-stone-900'}`}>
              {weatherZones.map(zone => <option key={zone.name} value={zone.name}>{zone.name}</option>)}
            </select>
            <button onClick={handleAnalyzeZones} title="Analyze Selected Zone" className="bg-red-700 text-white w-10 rounded-xl shadow-lg hover:bg-red-800 transition-all flex items-center justify-center">
              <i className="fas fa-bolt"></i>
            </button>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className={`text-[8px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Property Marking</label>
          <button onClick={() => setShowAddFarm(true)} className="w-full bg-emerald-700 text-white py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-lg hover:bg-emerald-800 transition-all">
            Add GPS Farm
          </button>
        </div>

        <div className="space-y-1.5">
          <label className={`text-[8px] font-black uppercase tracking-widest ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Action</label>
          <button onClick={resetMap} className={`w-full bg-stone-100 border border-stone-200 text-stone-600 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-stone-200 transition-all`}>
            Reset Map View
          </button>
        </div>
      </div>

      {/* Main Full-Height Interactive Map Section */}
      <div className="flex-1 flex gap-4 relative overflow-hidden h-full rounded-[2.5rem] border border-stone-200 shadow-inner">
        
        {/* Sliding Panel for Logistics */}
        <div className={`absolute left-4 top-4 bottom-4 w-72 z-[1000] p-6 rounded-[2rem] border shadow-2xl flex flex-col gap-6 transform transition-transform duration-500 overflow-y-auto no-scrollbar ${isDarkMode ? 'bg-stone-900/95 border-white/10' : 'bg-white/95 border-stone-200'}`}>
           <h4 className={`text-[9px] font-black uppercase tracking-[0.3em] ${isDarkMode ? 'text-emerald-400' : 'text-emerald-700'}`}>Logistic Analysis</h4>
           <div className="space-y-4">
              <div className="relative">
                 <i className="fas fa-truck absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[10px]"></i>
                 <input value={route.from} onChange={e => setRoute({...route, from: e.target.value})} placeholder="Start City" className={`w-full bg-stone-50 border border-stone-200 rounded-lg py-2.5 pl-10 pr-3 text-[10px] font-bold outline-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'text-stone-900'}`} />
              </div>
              <div className="relative">
                 <i className="fas fa-map-pin absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-[10px]"></i>
                 <input value={route.to} onChange={e => setRoute({...route, to: e.target.value})} placeholder="Destination" className={`w-full bg-stone-50 border border-stone-200 rounded-lg py-2.5 pl-10 pr-3 text-[10px] font-bold outline-none ${isDarkMode ? 'bg-white/5 border-white/10 text-white' : 'text-stone-900'}`} />
              </div>
              <button onClick={() => {}} className="w-full bg-stone-900 text-white py-3 rounded-xl text-[9px] font-black uppercase shadow-lg hover:bg-emerald-800 transition-all">Analyze Route Safety</button>
           </div>
           
           <div className="mt-4 pt-4 border-t border-stone-100 dark:border-white/5">
              <h5 className="text-[8px] font-black uppercase tracking-widest text-stone-400 mb-4">India Weather Zones</h5>
              <div className="grid grid-cols-2 gap-2">
                 {weatherZones.map(zone => (
                   <div key={zone.name} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: zone.color }}></div>
                      <span className="text-[8px] font-bold text-stone-500">{zone.name}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* The Map Component - Ensures full height and width */}
        <div className="flex-1 w-full h-full relative z-10">
          {loading && (
            <div className="absolute inset-0 z-[3000] bg-white/20 backdrop-blur-sm flex items-center justify-center">
               <div className="bg-white/90 p-8 rounded-3xl shadow-3xl flex flex-col items-center">
                  <i className="fas fa-satellite-dish text-3xl text-emerald-700 animate-spin mb-3"></i>
                  <p className="text-[9px] font-black uppercase tracking-widest text-stone-800">Processing Satellite Feed...</p>
               </div>
            </div>
          )}
          <div ref={mapContainerRef} className="w-full h-full" />
        </div>
      </div>

      <style>{`
        .leaflet-container { height: 100%; width: 100%; border-radius: 2.5rem; }
        .zone-tooltip { background: rgba(0,0,0,0.8); color: white; border: none; font-size: 10px; font-weight: bold; border-radius: 8px; padding: 6px 12px; text-transform: uppercase; letter-spacing: 0.1em; pointer-events: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default WeatherAdvisory;
