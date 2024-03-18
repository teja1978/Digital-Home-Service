import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  
  constructor(private http: HttpClient) {

	}
  
  createOrder(amount: number): Observable<any> {
		return this.http.post("http://localhost:8081/api/payment-gateway/createOrder", {
      amount: amount
		}, this.httpOptions);
	}
}
