
import React, { useEffect, useRef } from 'react';
import { Location } from './map-types';

interface MapDisplayProps {
  userLocation: Location | null;
  initializeMap: (mapRef: HTMLDivElement) => void;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ userLocation, initializeMap }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current && userLocation) {
      // Only initialize map if we have a reference and a location
      initializeMap(mapRef.current);
    }
  }, [userLocation, initializeMap]);

  if (!userLocation) {
    return null;
  }
  
  return (
    <div 
      ref={mapRef} 
      className="w-full h-64 rounded-md overflow-hidden border border-border"
    ></div>
  );
};

export default React.memo(MapDisplay);
