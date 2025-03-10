
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from "sonner";
import { GasStation, Location } from './map-types';

export function useGasStations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);
  const [stations, setStations] = useState<GasStation[]>([]);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const markersRef = useRef<Array<google.maps.marker.AdvancedMarkerElement | google.maps.Marker>>([]);

  // Load Google Maps script
  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google?.maps) {
      setMapLoaded(true);
      return;
    }

    // Reset any previous errors
    setMapError(null);

    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB1DNXVI2S-kUTK02E6bLrnFOl-k7e8jkM&libraries=places,geometry&loading=async&v=weekly`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    
    googleMapsScript.onload = () => {
      setMapLoaded(true);
      toast.success("Maps loaded successfully");
    };
    
    googleMapsScript.onerror = () => {
      setMapError("Failed to load Google Maps API. Please try again later.");
      toast.error("Failed to load maps");
    };
    
    // Set up error listener for Google Maps API errors
    window.gm_authFailure = () => {
      setMapError("Google Maps API key error: Billing is not enabled or the API is not activated. Please check your API key configuration.");
      toast.error("Google Maps API key error");
    };
    
    document.head.appendChild(googleMapsScript);
    
    return () => {
      // Clean up
      if (document.head.contains(googleMapsScript)) {
        document.head.removeChild(googleMapsScript);
      }
      // Remove the global error handler
      window.gm_authFailure = null;
    };
  }, []);

  const getUserLocation = useCallback(() => {
    setLoading(true);
    setError(null);
    
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        setLoading(false);
        toast.success("Location found");
      },
      (error) => {
        setError(`Error getting location: ${error.message}`);
        setLoading(false);
        toast.error("Could not get your location");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  // Clear all markers from the map
  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(marker => {
      marker.map = null; // This removes the marker from the map
    });
    markersRef.current = [];
  }, []);

  const findNearbyGasStations = useCallback(() => {
    if (!mapLoaded || !userLocation || !mapInstanceRef.current || mapError) return;
    
    setLoading(true);
    setStations([]);
    clearMarkers();
    
    try {
      // Use the map instance for PlacesService
      const service = new google.maps.places.PlacesService(mapInstanceRef.current);
      
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
              if (mapInstanceRef.current) {
                try {
                  // Try to use AdvancedMarkerElement if available (newer version)
                  if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
                    const marker = new google.maps.marker.AdvancedMarkerElement({
                      map: mapInstanceRef.current,
                      position: placeLocation.toJSON(),
                      title: place.name,
                    });
                    markersRef.current.push(marker);
                  } else {
                    // Fallback to deprecated Marker
                    const marker = new google.maps.Marker({
                      position: placeLocation.toJSON(),
                      map: mapInstanceRef.current,
                      title: place.name,
                      icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 8,
                        fillColor: "#ff6d01",
                        fillOpacity: 1,
                        strokeWeight: 2,
                        strokeColor: "#ffffff",
                      },
                    });
                    markersRef.current.push(marker);
                  }
                } catch (markerError) {
                  console.error("Error creating marker:", markerError);
                }
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
  }, [mapLoaded, userLocation, mapError, clearMarkers]);

  const initializeMap = useCallback((mapRef: HTMLDivElement) => {
    if (!mapLoaded || !userLocation || mapInstanceRef.current || mapError) return;
    
    try {
      console.log("Initializing map with location:", userLocation);
      
      // Clear any existing markers
      clearMarkers();
      
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
          try {
            // Try to use AdvancedMarkerElement if available
            if (google.maps.marker && google.maps.marker.AdvancedMarkerElement) {
              const marker = new google.maps.marker.AdvancedMarkerElement({
                map: mapInstanceRef.current,
                position: userLocation,
                title: "Your Location",
              });
              markersRef.current.push(marker);
            } else {
              // Fallback to deprecated Marker
              const marker = new google.maps.Marker({
                position: userLocation,
                map: mapInstanceRef.current,
                icon: {
                  path: google.maps.SymbolPath.CIRCLE,
                  scale: 10,
                  fillColor: "#1a73e8",
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: "#ffffff",
                },
                title: "Your Location",
              });
              markersRef.current.push(marker);
            }
            
            findNearbyGasStations();
          } catch (markerError) {
            console.error("Error creating user location marker:", markerError);
          }
        }
      });
    } catch (e) {
      setMapError(`Error initializing map: ${e instanceof Error ? e.message : String(e)}`);
      console.error("Map initialization error:", e);
    }
  }, [mapLoaded, userLocation, mapError, findNearbyGasStations, clearMarkers]);

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
