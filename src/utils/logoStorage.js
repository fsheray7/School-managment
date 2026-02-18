/**
 * logoStorage.js
 * Stores large logo data (base64 strings) in IndexedDB to avoid
 * localStorage quota limits. Falls back gracefully if IndexedDB is unavailable.
 */

const DB_NAME = "school_mgmt_db";
const DB_VERSION = 1;
const STORE_NAME = "logos";

function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    req.onsuccess = (e) => resolve(e.target.result);
    req.onerror = (e) => reject(e.target.error);
  });
}

export async function saveLogo(key, dataUrl) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readwrite");
      tx.objectStore(STORE_NAME).put(dataUrl, key);
      tx.oncomplete = () => resolve();
      tx.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.warn("IndexedDB unavailable, logo not persisted:", err);
  }
}

export async function loadLogo(key) {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, "readonly");
      const req = tx.objectStore(STORE_NAME).get(key);
      req.onsuccess = (e) => resolve(e.target.result || null);
      req.onerror = (e) => reject(e.target.error);
    });
  } catch (err) {
    console.warn("IndexedDB unavailable:", err);
    return null;
  }
}
