
import { useRef, useCallback } from 'react';

type MarkerType = google.maps.marker.AdvancedMarkerElement | google.maps.Marker;

export function useMapMarkers() {
  const markersRef = useRef<MarkerType[]>([]);

  // Clear all markers from the map
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(marker => {
      if (marker instanceof google.maps.Marker) {
        marker.setMap(null); // For classic Marker
      } else if (marker instanceof google.maps.marker.AdvancedMarkerElement) {
        marker.map = null; // For AdvancedMarkerElement
      }
    });
    markersRef.current = [];
  }, []);

  // Add a marker to the map
  const addMarker = useCallback((map: google.maps.Map, position: google.maps.LatLngLiteral, title: string, isUserLocation = false) => {
    try {
      let marker: MarkerType;
      
      // Try to use AdvancedMarkerElement if available (newer version)
      if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
        marker = new google.maps.marker.AdvancedMarkerElement({
          map: map,
          position: position,
          title: title,
        });
      } else {
        // Fallback to deprecated Marker
        marker = new google.maps.Marker({
          position: position,
          map: map,
          title: title,
          icon: isUserLocation ? {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#1a73e8",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          } : {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: "#ff6d01",
            fillOpacity: 1,
            strokeWeight: 2,
            strokeColor: "#ffffff",
          }
        });
      }
      
      markersRef.current.push(marker);
      return marker;
    } catch (e) {
      console.error("Error creating marker:", e);
      return null;
    }
  }, []);

  return { markersRef, clearMarkers, addMarker };
}
