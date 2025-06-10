import {MMKV} from 'react-native-mmkv';

export const mmkvStorage = new MMKV();

export const zustandMMKVStorage = {
  getItem: (key: string) => {
    const value = mmkvStorage.getString(key);
    return value ? JSON.parse(value) : null;
  },
  setItem: (key: string, value: any) => {
    mmkvStorage.set(key, JSON.stringify(value));
  },
  removeItem: (key: string) => {
    mmkvStorage.delete(key);
  },
};
