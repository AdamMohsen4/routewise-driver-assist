
export interface GasStation {
  name: string;
  vicinity: string;
  distance: string;
  price?: string;
}

export interface Location {
  lat: number;
  lng: number;
}

// Extend the Window interface to include Google Maps properties
declare global {
  interface Window {
    gm_authFailure?: () => void;
  }
}
