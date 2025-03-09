
import React from 'react';
import { GasStation } from './map-types';

interface GasStationListProps {
  stations: GasStation[];
}

const GasStationList: React.FC<GasStationListProps> = ({ stations }) => {
  if (stations.length === 0) return null;

  return (
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
  );
};

export default GasStationList;
