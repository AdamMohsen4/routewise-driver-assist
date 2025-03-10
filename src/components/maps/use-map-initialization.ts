
import { useRef, useCallback } from 'react';
import { Location } from './map-types';

export function useMapInitialization() {
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  const initializeMap = useCallback((
    mapRef: HTMLDivElement,
    userLocation: Location,
    mapLoaded: boolean,
    addUserLocationMarker: (map: google.maps.Map, position: google.maps.LatLngLiteral, title: string, isUserLocation: boolean) => void | null,
    onMapReady: () => void
  ) => {
    if (!mapLoaded || !userLocation || mapInstanceRef.current) return;
    
    try {
      console.log("Initializing map with location:", userLocation);
      
      const mapOptions: google.maps.MapOptions = {
        center: userLocation,
        zoom: 13,
        styles: [
          { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
          { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
          { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
          { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
        ],
      };
      
      // Create the map instance
      const mapElement = new google.maps.Map(mapRef, mapOptions);
      mapInstanceRef.current = mapElement;
      
      // Add marker for user location after map is fully loaded
      google.maps.event.addListenerOnce(mapElement, 'idle', () => {
        if (mapInstanceRef.current) {
          addUserLocationMarker(mapInstanceRef.current, userLocation, "Your Location", true);
          onMapReady();
        }
      });
    } catch (e) {
      console.error("Map initialization error:", e);
    }
  }, []);

  return { mapInstanceRef, initializeMap };
}
