
import React, { useEffect, useRef } from 'react';
import { Location } from './map-types';
import { AlertCircle } from 'lucide-react';

interface MapDisplayProps {
  userLocation: Location | null;
  initializeMap: (mapRef: HTMLDivElement) => void;
  mapError: string | null;
  mapLoaded: boolean;
}

const MapDisplay: React.FC<MapDisplayProps> = ({ 
  userLocation, 
  initializeMap, 
  mapError,
  mapLoaded
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current && userLocation && mapLoaded && !mapError) {
      // Only initialize map if we have a reference, location, and no errors
      initializeMap(mapRef.current);
    }
  }, [userLocation, initializeMap, mapLoaded, mapError]);

  // Show error message if there's a map error
  if (mapError) {
    return (
      <div className="w-full h-64 rounded-md flex flex-col items-center justify-center bg-destructive/10 text-destructive">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p className="text-sm text-center px-4">{mapError}</p>
        <p className="text-xs mt-2">
          Please check your Google Maps API configuration
        </p>
      </div>
    );
  }

  // Show loading state when waiting for location
  if (!userLocation) {
    return (
      <div className="w-full h-64 rounded-md flex items-center justify-center bg-muted">
        <p className="text-muted-foreground">Please enable location to view the map</p>
      </div>
    );
  }
  
  return (
    <div 
      ref={mapRef} 
      className="w-full h-64 rounded-md overflow-hidden border border-border"
      id="map-container"
    ></div>
  );
};

export default React.memo(MapDisplay);
