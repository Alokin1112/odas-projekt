import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  get<T>(key: string): T {
    return JSON.parse(window.localStorage.getItem(key) as string) as unknown as T;
  }

  save<T>(key: string, data: T): void {
    window.localStorage.setItem(key, JSON.stringify(data));
  }

  remove(key: string): void {
    window.localStorage.removeItem(key);
  }

}
