import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lead, LeadStatus } from './model/lead.model';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  private baseURL = 'http://localhost:8081/api/lead'; // Replace with your actual API URL

  constructor(private httpClient: HttpClient) { }

  findLeadsByPartnerIdAndServiceId(partnerId: string, serviceId: number): Observable<Lead[]> {
    return this.httpClient.get<Lead[]>(`${this.baseURL}/find/${partnerId}/${serviceId}`);
  }

  updateLeadStatus(leadId: number, status: LeadStatus): Observable<Lead> {
    return this.httpClient.put<Lead>(`${this.baseURL}/updateLeadStatus/${leadId}/${status}`, {});
  }

  updateTotalAmount(lead: Lead): Observable<Lead> {
    return this.httpClient.put<Lead>(`${this.baseURL}/updateTotalAmount`, lead);
  }
}
