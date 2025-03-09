
import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Fuel } from "lucide-react";
import { toast } from "sonner";

interface GasStation {
  name: string;
  vicinity: string;
  distance: string;
  price?: string;
}

const NearbyGasStations = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stations, setStations] = useState<GasStation[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
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
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places,geometry`;
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

  // Initialize map once script is loaded and we have user location
  useEffect(() => {
    if (!mapLoaded || !userLocation || !mapRef.current) return;
    
    try {
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
      
      mapInstanceRef.current = new google.maps.Map(mapRef.current, mapOptions);
      
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
  }, [mapLoaded, userLocation]);

  const getUserLocation = () => {
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
  };

  const findNearbyGasStations = () => {
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
  };

  return (
    <Card className="w-full mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Fuel className="mr-2 h-5 w-5 text-truckwise-orange" />
          Nearby Gas Stations
        </CardTitle>
        <CardDescription>
          Find the closest gas stations to your current location
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!userLocation && (
          <Button 
            onClick={getUserLocation}
            disabled={loading || !mapLoaded}
            className="w-full"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Locating...
              </>
            ) : (
              <>
                <MapPin className="mr-2 h-4 w-4" />
                Find Nearby Gas Stations
              </>
            )}
          </Button>
        )}
        
        {error && (
          <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div 
          ref={mapRef} 
          className={`w-full h-64 rounded-md overflow-hidden ${!userLocation ? 'hidden' : ''}`}
        ></div>
        
        {stations.length > 0 && (
          <div className="space-y-3 mt-4">
            <h3 className="font-medium">Gas Stations Near You</h3>
            {stations.map((station, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-background border rounded-md">
                <div>
                  <p className="font-medium">{station.name}</p>
                  <p className="text-sm text-muted-foreground">{station.vicinity}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm">{station.distance}</p>
                  <p className="font-bold text-truckwise-orange">{station.price} kr/L</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NearbyGasStations;
