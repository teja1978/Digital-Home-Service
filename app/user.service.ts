import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: BehaviorSubject<any> = new BehaviorSubject<any>({});
  user$ = this.user.asObservable();

  constructor() { }

  loggedInUser(user: any) {
    this.user.next(user);
  }
}
