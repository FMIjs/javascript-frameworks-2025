export class LocalStorageService {
  private storage = localStorage;

  setItem(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | null {
    const item = this.storage.getItem(key);
    return item ? JSON.parse(item) as T : null;
  }  
}
