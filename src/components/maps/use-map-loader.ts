
import { useState, useEffect } from 'react';
import { toast } from "sonner";

export function useMapLoader() {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

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
      window.gm_authFailure = undefined;
    };
  }, []);

  return { mapLoaded, mapError };
}
