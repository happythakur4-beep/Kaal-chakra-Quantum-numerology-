export interface UserLocation {
  lat: number;
  lng: number;
  cityName?: string;
  source: 'gps' | 'preset' | 'manual';
  timestamp?: number;
}

const STORAGE_KEY = 'kaalchakra_saved_location_v1';
const GRANTED_KEY = 'kaalchakra_location_permission_granted';

export const PRESET_LOCATIONS: { name: string; lat: number; lng: number; desc: string }[] = [
  { name: 'Varanasi (Kashi)', lat: 25.3176, lng: 82.9739, desc: 'Sacred Spiritual Capital & Ganga Node' },
  { name: 'New Delhi', lat: 28.6139, lng: 77.2090, desc: 'National Meridian & Observatory Hub' },
  { name: 'Ujjain (Mahakaleshwar)', lat: 23.1765, lng: 75.7885, desc: 'Prime Meridian of Ancient Indian Astronomy' },
  { name: 'Haridwar / Rishikesh', lat: 29.9457, lng: 78.1642, desc: 'Himalayan Foothills Energy Gateway' },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, desc: 'Western Coastal Power Center' },
  { name: 'Jaipur (Jantar Mantar)', lat: 26.9124, lng: 75.7873, desc: 'UNESCO World Heritage Astro-Observatory' },
  { name: 'Bengaluru', lat: 12.9716, lng: 77.5946, desc: 'Deccan Plateau Tech & Cosmic Node' },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, desc: 'Eastern Sacred Delta (Kalighat)' },
  { name: 'Tirupati (Venkateswara)', lat: 13.6288, lng: 79.4192, desc: 'Seven Sacred Hills Vortex' },
  { name: 'London (Greenwich)', lat: 51.5074, lng: -0.1278, desc: 'Prime Meridian Global Reference' },
  { name: 'New York (Manhattan)', lat: 40.7128, lng: -74.0060, desc: 'North American Leyline Crossing' },
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, desc: 'Mount Fuji Pacific Energy Arc' },
];

export const DEFAULT_FALLBACK_LOCATION: UserLocation = {
  lat: 25.3176,
  lng: 82.9739,
  cityName: 'Varanasi (Kashi)',
  source: 'preset',
};

class LocationManager {
  private currentLocation: UserLocation | null = null;
  private listeners: Set<(loc: UserLocation) => void> = new Set();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
          this.currentLocation = JSON.parse(saved);
        }
      }
    } catch (e) {
      console.warn('LocationManager: Error loading location from localStorage', e);
    }
  }

  public getLocation(): UserLocation {
    if (this.currentLocation) {
      return this.currentLocation;
    }
    return DEFAULT_FALLBACK_LOCATION;
  }

  public hasSavedLocation(): boolean {
    return this.currentLocation !== null;
  }

  public setLocation(loc: UserLocation) {
    this.currentLocation = {
      ...loc,
      timestamp: Date.now(),
    };
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.currentLocation));
        localStorage.setItem(GRANTED_KEY, 'true');
      }
    } catch (e) {
      console.warn('LocationManager: Error saving location to localStorage', e);
    }
    this.notifyListeners();
  }

  public subscribe(callback: (loc: UserLocation) => void): () => void {
    this.listeners.add(callback);
    callback(this.getLocation());
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners() {
    const loc = this.getLocation();
    this.listeners.forEach((cb) => cb(loc));
  }

  /**
   * Request GPS position only once and cache permanently in browser.
   * If already granted & saved, returns cached coords directly without asking browser again.
   */
  public async requestGPSOnce(forcePrompt: boolean = false): Promise<UserLocation> {
    // If not forcing a re-prompt and we already have a saved GPS location, return it
    if (!forcePrompt && this.currentLocation && this.currentLocation.source === 'gps') {
      return this.currentLocation;
    }

    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      throw new Error('Geolocation is not supported by this browser.');
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const newLoc: UserLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            cityName: `GPS (${pos.coords.latitude.toFixed(2)}°, ${pos.coords.longitude.toFixed(2)}°)`,
            source: 'gps',
            timestamp: Date.now(),
          };
          this.setLocation(newLoc);
          resolve(newLoc);
        },
        (err) => {
          console.warn('LocationManager: Geolocation error', err);
          reject(err);
        },
        {
          enableHighAccuracy: false,
          timeout: 10000,
          maximumAge: 86400000, // 24 hours browser cache
        }
      );
    });
  }

  public clearLocation() {
    this.currentLocation = null;
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(GRANTED_KEY);
      }
    } catch (e) {}
    this.notifyListeners();
  }
}

export const locationManager = new LocationManager();
