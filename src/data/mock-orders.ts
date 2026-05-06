import { useSyncExternalStore } from "react";

export const LAST_ORDER_STORAGE_KEY = "sorastore.lastOrder.v1" as const;

export type MockOrderStatus = "created" | "paid" | "packed" | "shipped" | "delivered";

export type MockOrder = {
  id: string; // e.g. ORD-12345
  phone: string;
  createdAt: string; // ISO
  total: number;
  status: MockOrderStatus;
};

export const mockOrders: MockOrder[] = [
  {
    id: "ORD-10293",
    phone: "08123456789",
    createdAt: "2026-05-01T10:12:00.000Z",
    total: 248000,
    status: "shipped",
  },
  {
    id: "ORD-88310",
    phone: "082198765432",
    createdAt: "2026-05-03T04:33:00.000Z",
    total: 179000,
    status: "paid",
  },
  {
    id: "ORD-55001",
    phone: "087700112233",
    createdAt: "2026-05-05T14:05:00.000Z",
    total: 399000,
    status: "delivered",
  },
];

export function readLastOrder(): MockOrder | null {
  try {
    const raw = localStorage.getItem(LAST_ORDER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const o = parsed as Partial<MockOrder>;
    if (typeof o.id !== "string") return null;
    if (typeof o.phone !== "string") return null;
    if (typeof o.createdAt !== "string") return null;
    if (typeof o.total !== "number") return null;
    if (o.status !== "created" && o.status !== "paid" && o.status !== "packed" && o.status !== "shipped" && o.status !== "delivered") {
      return null;
    }
    return o as MockOrder;
  } catch {
    return null;
  }
}

export function saveLastOrder(order: MockOrder) {
  try {
    localStorage.setItem(LAST_ORDER_STORAGE_KEY, JSON.stringify(order));
    if (typeof window !== "undefined") {
      window.dispatchEvent(new StorageEvent("storage", { key: LAST_ORDER_STORAGE_KEY }));
    }
  } catch {
    // ignore quota/security errors
  }
}

function subscribeToLastOrder(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = (e: StorageEvent) => {
    if (e.key === null || e.key === LAST_ORDER_STORAGE_KEY) callback();
  };
  window.addEventListener("storage", handler);
  return () => window.removeEventListener("storage", handler);
}

let cachedSerialized: string | null = null;
let cachedValue: MockOrder | null = null;

function getLastOrderSnapshot(): MockOrder | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LAST_ORDER_STORAGE_KEY);
    if (raw === cachedSerialized) return cachedValue;
    cachedSerialized = raw;
    cachedValue = readLastOrder();
    return cachedValue;
  } catch {
    return null;
  }
}

const getServerSnapshot = (): MockOrder | null => null;

/**
 * SSR-safe React hook for reading the persisted "last order" from localStorage.
 * Subscribes to storage changes so the UI can react when a new order is saved.
 */
export function useLastOrder(): MockOrder | null {
  return useSyncExternalStore(subscribeToLastOrder, getLastOrderSnapshot, getServerSnapshot);
}

