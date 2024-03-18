import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { PartnerOffering } from './model/partner-offering.model';

@Injectable({
  providedIn: 'root'
})
export class PartnerOfferingService {

  baseURL = 'http://localhost:8081/api/market-place-partner/partner-offerings';

  constructor(private http: HttpClient) { }

  register(body: any, offeringId: number) {
    return this.http.post(this.baseURL + '/register/' + offeringId, body);
  }

  checkIfRegistered(partnerId:string) {
    return this.http.get<PartnerOffering[]>(this.baseURL+ '/find/'+partnerId);
  }


}
