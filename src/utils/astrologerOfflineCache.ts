import { AI_ASTROLOGERS_LIST, AIAstrologer } from '../data/astroSageDirectory';

export interface AstrologerQueueStatus {
  queueCount: number;
  waitTimeMin: number;
  isOccupied: boolean;
  lastUpdated: number;
}

export interface CachedAstrologerProfile extends AIAstrologer {
  cachedAt: number;
  offlineAvailable: boolean;
}

export interface OfflineConsultationQuery {
  id: string;
  astrologerId: string;
  astrologerName: string;
  query: string;
  timestamp: number;
  status: 'pending_sync' | 'synced';
}

const ASTROLOGER_CACHE_KEY = 'kaalchakra_cached_astrologers_v1';
const QUEUE_CACHE_KEY = 'kaalchakra_cached_queues_v1';
const OFFLINE_QUERIES_KEY = 'kaalchakra_offline_queries_v1';
const LAST_SYNC_KEY = 'kaalchakra_astrologer_last_sync_v1';

/**
 * Robust Client-Side and Service Worker Synchronized Cache Engine
 * Ensures Astrologer Profiles, Queue Statuses, and Pending Queries
 * persist seamlessly during network drops, offline commuting, or brief intervals.
 */
class AstrologerOfflineCacheEngine {
  private inMemoryAstrologers: CachedAstrologerProfile[] = [];
  private inMemoryQueues: Record<string, AstrologerQueueStatus> = {};
  private listeners: Array<(isOffline: boolean, timestamp: number) => void> = [];
  private isOfflineState: boolean = typeof navigator !== 'undefined' ? !navigator.onLine : false;

  constructor() {
    this.initialize();
  }

  private initialize() {
    if (typeof window === 'undefined') return;

    // 1. Preload or seed from localStorage
    try {
      const storedAstrologers = localStorage.getItem(ASTROLOGER_CACHE_KEY);
      if (storedAstrologers) {
        this.inMemoryAstrologers = JSON.parse(storedAstrologers);
      } else {
        // Seed default dataset with offline timestamp
        const now = Date.now();
        this.inMemoryAstrologers = AI_ASTROLOGERS_LIST.map((a) => ({
          ...a,
          cachedAt: now,
          offlineAvailable: true,
        }));
        this.saveAstrologersToStorage();
      }

      const storedQueues = localStorage.getItem(QUEUE_CACHE_KEY);
      if (storedQueues) {
        this.inMemoryQueues = JSON.parse(storedQueues);
      } else {
        const initialQueues: Record<string, AstrologerQueueStatus> = {
          'swami-ji': { queueCount: 0, waitTimeMin: 0, isOccupied: false, lastUpdated: Date.now() },
          'arjun-pandit': { queueCount: 3, waitTimeMin: 6, isOccupied: true, lastUpdated: Date.now() },
          'mr-krishnamurti': { queueCount: 0, waitTimeMin: 0, isOccupied: false, lastUpdated: Date.now() },
          'love-guru': { queueCount: 4, waitTimeMin: 9, isOccupied: true, lastUpdated: Date.now() },
          'acharya-dev': { queueCount: 2, waitTimeMin: 4, isOccupied: true, lastUpdated: Date.now() },
        };
        this.inMemoryQueues = initialQueues;
        this.saveQueuesToStorage();
      }
    } catch (e) {
      console.warn('[AstrologerCache] LocalStorage initialization notice:', e);
    }

    // 2. Setup Online/Offline Network Listeners
    window.addEventListener('online', this.handleOnline);
    window.addEventListener('offline', this.handleOffline);

    // 3. Post to Service Worker if active
    this.syncWithServiceWorker();
  }

  private handleOnline = () => {
    this.isOfflineState = false;
    this.notifyListeners();
    this.syncWithServiceWorker();
  };

  private handleOffline = () => {
    this.isOfflineState = true;
    this.notifyListeners();
  };

  private notifyListeners() {
    const lastSync = this.getLastSyncTimestamp();
    this.listeners.forEach((listener) => {
      try {
        listener(this.isOfflineState, lastSync);
      } catch (err) {
        console.error('[AstrologerCache] Listener callback error:', err);
      }
    });
  }

  public subscribe(callback: (isOffline: boolean, lastSyncTimestamp: number) => void): () => void {
    this.listeners.push(callback);
    // Trigger immediately with current state
    callback(this.isOfflineState, this.getLastSyncTimestamp());
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  public getIsOffline(): boolean {
    return this.isOfflineState;
  }

  /**
   * For testing or manual simulation of brief offline intervals in the UI
   */
  public setSimulatedOffline(offline: boolean) {
    this.isOfflineState = offline;
    this.notifyListeners();
  }

  public getLastSyncTimestamp(): number {
    try {
      const stored = localStorage.getItem(LAST_SYNC_KEY);
      return stored ? parseInt(stored, 10) : Date.now();
    } catch {
      return Date.now();
    }
  }

  public getCachedAstrologers(): CachedAstrologerProfile[] {
    if (this.inMemoryAstrologers && this.inMemoryAstrologers.length > 0) {
      return this.inMemoryAstrologers;
    }
    try {
      const stored = localStorage.getItem(ASTROLOGER_CACHE_KEY);
      if (stored) {
        this.inMemoryAstrologers = JSON.parse(stored);
        return this.inMemoryAstrologers;
      }
    } catch {}

    // Fallback seed
    return AI_ASTROLOGERS_LIST.map((a) => ({
      ...a,
      cachedAt: Date.now(),
      offlineAvailable: true,
    }));
  }

  public getAstrologers(): CachedAstrologerProfile[] {
    return this.getCachedAstrologers();
  }

  public getCachedQueueData(): Record<string, AstrologerQueueStatus> {
    if (this.inMemoryQueues && Object.keys(this.inMemoryQueues).length > 0) {
      return this.inMemoryQueues;
    }
    try {
      const stored = localStorage.getItem(QUEUE_CACHE_KEY);
      if (stored) {
        this.inMemoryQueues = JSON.parse(stored);
        return this.inMemoryQueues;
      }
    } catch {}

    return {
      'swami-ji': { queueCount: 0, waitTimeMin: 0, isOccupied: false, lastUpdated: Date.now() },
      'arjun-pandit': { queueCount: 3, waitTimeMin: 6, isOccupied: true, lastUpdated: Date.now() },
      'mr-krishnamurti': { queueCount: 0, waitTimeMin: 0, isOccupied: false, lastUpdated: Date.now() },
      'love-guru': { queueCount: 4, waitTimeMin: 9, isOccupied: true, lastUpdated: Date.now() },
      'acharya-dev': { queueCount: 2, waitTimeMin: 4, isOccupied: true, lastUpdated: Date.now() },
    };
  }

  public updateQueueSnapshot(queues: Record<string, AstrologerQueueStatus>) {
    this.inMemoryQueues = { ...queues };
    this.saveQueuesToStorage();
    try {
      localStorage.setItem(LAST_SYNC_KEY, String(Date.now()));
    } catch {}
    this.syncWithServiceWorker();
  }

  private saveAstrologersToStorage() {
    try {
      localStorage.setItem(ASTROLOGER_CACHE_KEY, JSON.stringify(this.inMemoryAstrologers));
      localStorage.setItem(LAST_SYNC_KEY, String(Date.now()));
    } catch (e) {
      console.warn('[AstrologerCache] Could not persist astrologers:', e);
    }
  }

  private saveQueuesToStorage() {
    try {
      localStorage.setItem(QUEUE_CACHE_KEY, JSON.stringify(this.inMemoryQueues));
    } catch (e) {
      console.warn('[AstrologerCache] Could not persist queue statuses:', e);
    }
  }

  /**
   * Allows seekers to draft consultation questions while offline, which automatically
   * queue up and sync when internet connectivity restores.
   */
  public queueOfflineQuery(astrologerId: string, astrologerName: string, query: string): OfflineConsultationQuery {
    const newQuery: OfflineConsultationQuery = {
      id: `query-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      astrologerId,
      astrologerName,
      query,
      timestamp: Date.now(),
      status: 'pending_sync',
    };

    try {
      const existing = this.getQueuedOfflineQueries();
      const updated = [newQuery, ...existing];
      localStorage.setItem(OFFLINE_QUERIES_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('[AstrologerCache] Could not queue offline query:', e);
    }

    return newQuery;
  }

  public getQueuedOfflineQueries(): OfflineConsultationQuery[] {
    try {
      const stored = localStorage.getItem(OFFLINE_QUERIES_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  public clearQueuedQuery(queryId: string) {
    try {
      const existing = this.getQueuedOfflineQueries();
      const updated = existing.filter((q) => q.id !== queryId);
      localStorage.setItem(OFFLINE_QUERIES_KEY, JSON.stringify(updated));
    } catch {}
  }

  /**
   * Broadcasts latest profiles and queue states to Service Worker CacheStorage
   */
  public syncWithServiceWorker() {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;

    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'CACHE_ASTROLOGER_DATA',
        payload: {
          astrologers: this.inMemoryAstrologers,
          queues: this.inMemoryQueues,
          syncedAt: Date.now(),
        },
      });
    }
  }
}

export const astrologerOfflineCache = new AstrologerOfflineCacheEngine();
