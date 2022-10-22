export interface FetchParams {
  key: string;
  params?: any;
  callback(): any;
  expiresInSeconds?: number;
}

export interface KeyParams {
  key: string;
  params?: any;
}

export interface StoredData<T> {
  key: string;
  data: T;
  expiration: number;
}

export interface StorageCache {
  fetch<T>(params: FetchParams): Promise<T> | T;
}

export type ActionType = 'set' | 'delete';

export type Observer = <T>(actionType: ActionType, data: T) => void;

const MapCache = () => ({
  cache: new Map(),
  defaultExpirationSeconds: 5 * 60,
  observers: [] as Array<Observer>,

  // observer
  subscribe(func: Observer) {
    this.observers.push(func);
  },

  unsubscribe(func: Observer) {
    this.observers = this.observers.filter((observer) => observer !== func);
  },

  notify<T>(actionType: ActionType, data: T) {
    this.observers.forEach((observer) => observer<T>(actionType, data));
  },

  setDefaultExpirationSeconds(seconds: number): void {
    this.defaultExpirationSeconds = seconds;
  },

  async fetch<T>({
    key,
    params = null,
    callback,
    expiresInSeconds,
  }: FetchParams): Promise<T> {
    const cacheKey = this.generateKey({ key, params });
    const data = this.get<T>(cacheKey);
    const expiration = this.computeExpirationTime(
      expiresInSeconds || this.defaultExpirationSeconds,
    );

    return (
      data || this.set<T>({ key: cacheKey, data: await callback(), expiration })
    );
  },

  clear(): void {
    this.cache = new Map();
  },

  deleteKey(key: string): void {
    this.cache.forEach((_, keyCache: string) => {
      if (keyCache.includes(key)) {
        this.cache.delete(keyCache);
      }
    });
  },

  size(): number {
    return this.cache.size;
  },

  computeExpirationTime(expiresInSeconds: number): number {
    return new Date().getTime() + expiresInSeconds * 1000;
  },

  generateKey({ key, params }: KeyParams): string {
    const keyValues = params ? { key, params } : { key };
    const stringifiedKey = JSON.stringify(keyValues);
    return stringifiedKey;
  },

  set<T>({ key, data, expiration }: StoredData<T>): T {
    this.cache.set(key, { data, expiration });
    this.notify('set', data);
    return data;
  },

  get<T>(key: string): T | null {
    if (this.cache.has(key)) {
      const { data, expiration } = this.cache.get(key) as StoredData<T>;

      return this.hasExpired(expiration) ? null : data;
    }

    return null;
  },

  hasExpired(expiration: number): boolean {
    return expiration < new Date().getTime();
  },
});

export default MapCache();
