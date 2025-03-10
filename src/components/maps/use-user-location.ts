
import { useState, useCallback } from 'react';
import { toast } from "sonner";
import { Location } from './map-types';

export function useUserLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<Location | null>(null);

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

  return { loading, error, userLocation, getUserLocation };
}
