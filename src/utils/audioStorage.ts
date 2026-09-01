// IndexedDB Audio Storage for User Uploaded Gayatri Mantra & Chants
const DB_NAME = 'SanctumVedicAudioDB';
const DB_VERSION = 1;
const STORE_NAME = 'user_audio_tracks';

export interface StoredAudioTrack {
  id: string;
  name: string;
  blob: Blob;
  size: number;
  type: string;
  duration?: number;
  uploadedAt: number;
}

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveAudioTrack(id: string, file: File | Blob, name: string, duration?: number): Promise<StoredAudioTrack> {
  const db = await openDB();
  const track: StoredAudioTrack = {
    id,
    name,
    blob: file,
    size: file.size,
    type: file.type || 'audio/mp3',
    duration,
    uploadedAt: Date.now()
  };

  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(track);
    req.onsuccess = () => resolve(track);
    req.onerror = () => reject(req.error);
  });
}

export async function getAudioTrack(id: string): Promise<StoredAudioTrack | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(id);
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => reject(req.error);
    });
  } catch {
    return null;
  }
}

export async function deleteAudioTrack(id: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {}
}
