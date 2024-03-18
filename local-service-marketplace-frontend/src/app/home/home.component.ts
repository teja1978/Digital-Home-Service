import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Offering, Response,PartnerOffering } from '../model/response.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  offerings: Offering[] = []; // Array to store offerings data
  selectedServiceName: string = ''; // Selected service name (initialized as an empty string)
  selectedOffering: Offering | null = null; // Selected offering (initialized as null)
  selectedPartner: PartnerOffering | null = null; // Selected partner (initialized as null)
  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchOfferings(); // Fetch offerings data when the component initializes
  }

  // Method to select a partner
  selectPartner(partner: PartnerOffering): void {
    this.selectedPartner = partner; // Set the selected partner
  }

  // Method to navigate to service details page
  onServiceClick(offering: Offering): void {
    this.router.navigate(['/service-details', offering.id, offering.name]); // Navigate to the service details page with parameters
  }

fetchOfferings() {
    this.http.get<Response<Offering[]>>('http://localhost:8081/api/market-place/offerings').subscribe({
      next: (resp) => {
        this.offerings = resp.data ? resp.data : []; // Set the offerings data from the response
        if (this.offerings.length > 0) {
          const firstOffering = this.offerings[0];
          this.selectedServiceName = firstOffering.name; // Set the selected service name to the first offering's name
        }
      },
      error: (error) => {
        console.error('There was an error fetching the offerings!', error);
      }
    });
  }
  
  
}
