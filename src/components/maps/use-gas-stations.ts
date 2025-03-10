
import { useState, useEffect, useRef, useCallback } from 'react';
import { toast } from "sonner";
import { GasStation, Location } from './map-types';

export function useGasStations() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stations, setStations] = useState<GasStation[]>([]);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Load Google Maps script
  useEffect(() => {
    // Check if Google Maps API is already loaded
    if (window.google?.maps) {
      setMapLoaded(true);
      return;
    }

    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB1DNXVI2S-kUTK02E6bLrnFOl-k7e8jkM&libraries=places,geometry`;
    googleMapsScript.async = true;
    googleMapsScript.defer = true;
    
    googleMapsScript.onload = () => {
      setMapLoaded(true);
      toast.success("Maps loaded successfully");
    };
    
    googleMapsScript.onerror = () => {
      setError("Failed to load Google Maps API. Please try again later.");
      toast.error("Failed to load maps");
    };
    
    document.head.appendChild(googleMapsScript);
    
    return () => {
      // Only remove the script if it exists in the document
      if (document.head.contains(googleMapsScript)) {
        document.head.removeChild(googleMapsScript);
      }
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

  const findNearbyGasStations = useCallback(() => {
    if (!mapLoaded || !userLocation || !mapInstanceRef.current) return;
    
    setLoading(true);
    setStations([]);
    
    try {
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
              new google.maps.Marker({
                position: placeLocation.toJSON(),
                map: mapInstanceRef.current!,
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
  }, [mapLoaded, userLocation]);

  const initializeMap = useCallback((mapRef: HTMLDivElement) => {
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
      
      mapInstanceRef.current = new google.maps.Map(mapRef, mapOptions);
      
      // Add marker for user location
      new google.maps.Marker({
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
      
      findNearbyGasStations();
    } catch (e) {
      setError(`Error initializing map: ${e instanceof Error ? e.message : String(e)}`);
      console.error("Map initialization error:", e);
    }
  }, [mapLoaded, userLocation, findNearbyGasStations]);

  return {
    loading,
    error,
    stations,
    userLocation,
    mapLoaded,
    mapInstanceRef,
    getUserLocation,
    initializeMap,
  };
}
