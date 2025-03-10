
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, MapPin, Fuel } from "lucide-react";
import { useGasStations } from './use-gas-stations';
import MapDisplay from './MapDisplay';
import GasStationList from './GasStationList';

const NearbyGasStations = () => {
  const {
    loading,
    error,
    stations,
    userLocation,
    getUserLocation,
    initializeMap,
    mapLoaded
  } = useGasStations();

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
        
        {userLocation && (
          <MapDisplay 
            userLocation={userLocation} 
            initializeMap={initializeMap} 
          />
        )}
        
        <GasStationList stations={stations} />
      </CardContent>
    </Card>
  );
};

export default NearbyGasStations;
