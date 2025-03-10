
import { useState, useCallback } from 'react';
import { useMapLoader } from './use-map-loader';
import { useUserLocation } from './use-user-location';
import { useMapMarkers } from './use-map-markers';
import { useGasStationSearch } from './use-gas-station-search';
import { useMapInitialization } from './use-map-initialization';

export function useGasStations() {
  const { mapLoaded, mapError } = useMapLoader();
  const { loading: locationLoading, error: locationError, userLocation, getUserLocation } = useUserLocation();
  const { markersRef, clearMarkers, addMarker } = useMapMarkers();
  const { loading: searchLoading, error: searchError, stations, findNearbyGasStations } = useGasStationSearch();
  const { mapInstanceRef, initializeMap: initMap } = useMapInitialization();
  
  // Combined loading state
  const loading = locationLoading || searchLoading;
  
  // Combined error state
  const [error, setError] = useState<string | null>(null);
  
  // Update error whenever underlying errors change
  useState(() => {
    const newError = locationError || searchError || null;
    setError(newError);
  });

  const initializeMap = useCallback((mapRef: HTMLDivElement) => {
    if (!mapRef || !userLocation || !mapLoaded || mapError) return;
    
    // Clear any existing markers
    clearMarkers();
    
    initMap(
      mapRef,
      userLocation,
      mapLoaded,
      addMarker,
      () => {
        // When map is ready, search for gas stations
        if (mapInstanceRef.current && userLocation) {
          findNearbyGasStations(userLocation, mapInstanceRef.current, addMarker, clearMarkers);
        }
      }
    );
  }, [mapLoaded, userLocation, mapError, clearMarkers, addMarker, initMap, findNearbyGasStations]);

  return {
    loading,
    error,
    mapError,
    stations,
    userLocation,
    mapLoaded,
    mapInstanceRef,
    getUserLocation,
    initializeMap,
  };
}
