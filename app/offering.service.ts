import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from './model/response.model';
import { Offering } from './model/offering.model';

@Injectable({
  providedIn: 'root'
})
export class OfferingService {


  baseURL = 'http://localhost:8081/api/market-place'
  constructor(private httpClient: HttpClient) { }

  findAllServices() {
    return this.httpClient.get<Response<Offering[]>>(this.baseURL+ '/offerings');
  }
}
