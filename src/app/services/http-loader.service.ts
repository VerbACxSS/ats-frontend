import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpLoaderService {

  private busyRequestCounter: number;

  public isLoading: BehaviorSubject<boolean>;

  constructor() {
    this.busyRequestCounter = 0;
    this.isLoading = new BehaviorSubject<boolean>(false);
  }

  public startRequest(): void {
    this.busyRequestCounter++;
    this.isLoading.next(true);
  }

  public finishRequest(): void {
    this.busyRequestCounter--;
    if (this.busyRequestCounter <= 0) {
      this.busyRequestCounter = 0;
      this.isLoading.next(false);
    }
  }
}
