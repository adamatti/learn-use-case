/**
 * Just a cache sample for a single instance, do not use it for prod
 */
const cacheTable: Record<string, any> = {};

const cache = {
  get: (key: string): Promise<any> => {
    return Promise.resolve(cacheTable[key]);
  },
  set: (key: string, value: any): Promise<void> => {
    cacheTable[key] = value;
    return Promise.resolve();
  },
  del: (key: string): Promise<void> => {
    delete cacheTable[key];
    return Promise.resolve();
  },
};

export type Cache = typeof cache;
export default cache;
