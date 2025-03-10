
import { useState, useCallback } from 'react';
import { toast } from "sonner";
import { GasStation, Location } from './map-types';

export function useGasStationSearch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stations, setStations] = useState<GasStation[]>([]);

  const findNearbyGasStations = useCallback((
    userLocation: Location,
    map: google.maps.Map,
    addMarker: (map: google.maps.Map, position: google.maps.LatLngLiteral, title: string) => void | null,
    clearMarkers: () => void
  ) => {
    if (!userLocation || !map) return;
    
    setLoading(true);
    setStations([]);
    clearMarkers();
    
    try {
      // Use the map instance for PlacesService
      const service = new google.maps.places.PlacesService(map);
      
      const request: google.maps.places.PlaceSearchRequest = {
        location: userLocation,
        radius: 5000, // 5km
        type: 'gas_station'
      };
      
      service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          // Process results
          const stationsData: GasStation[] = results.slice(0, 5).map((place) => {
            // Calculate distance (simple approximation)
            const placeLocation = place.geometry?.location;
            let distance = "Unknown";
            
            if (placeLocation && userLocation && window.google?.maps) {
              const distanceInMeters = google.maps.geometry.spherical.computeDistanceBetween(
                new google.maps.LatLng(userLocation.lat, userLocation.lng),
                placeLocation
              );
              distance = `${(distanceInMeters / 1000).toFixed(1)} km`;
              
              // Add marker for this gas station
              if (map) {
                addMarker(map, placeLocation.toJSON(), place.name || "Gas Station");
              }
            }
            
            return {
              name: place.name || "Unnamed Gas Station",
              vicinity: place.vicinity || "Unknown location",
              distance,
              // Note: Gas prices would require a specific API that provides this data
              price: (Math.random() * 2 + 15).toFixed(2), // Dummy data for demonstration
            };
          });
          
          setStations(stationsData);
        } else {
          setError("Could not find any gas stations nearby");
          toast.error("No gas stations found");
        }
        
        setLoading(false);
      });
    } catch (e) {
      setError(`Error finding gas stations: ${e instanceof Error ? e.message : String(e)}`);
      setLoading(false);
      console.error("Gas station search error:", e);
    }
  }, []);

  return { loading, error, stations, findNearbyGasStations };
}
