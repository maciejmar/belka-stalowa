import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataIntersectionService {
  private dataSubject = new BehaviorSubject<string>(''); // Initial value
  dataObservable = this.dataSubject.asObservable(); // Observable for components to subscribe to

  updateData(data: string) {
    this.dataSubject.next(data); // Update the data
  }
  constructor() { }
}
