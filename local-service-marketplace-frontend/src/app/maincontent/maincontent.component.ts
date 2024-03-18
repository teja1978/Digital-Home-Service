import { Component } from '@angular/core';
import { Offering, PartnerOffering, Response } from '../model/response.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.css']
})
export class MaincontentComponent {
  offerings: Offering[] = []; // Array to store offerings data
  map: Map<string, string> = new Map<string, string>(); // Map to map service names to images
  selectedServiceName: string = ''; // Selected service name (initialized as an empty string)
  selectedOffering: Offering | null = null; // Selected offering (initialized as null)
  selectedPartner: PartnerOffering | null = null; // Selected partner (initialized as null)

  constructor(private http: HttpClient, private router: Router) {
    // Initialize the map with service names and corresponding image paths
    this.map.set('Electrician', '/assets/images/electrician1.png');
    this.map.set('Plumber', '/assets/images/plumber.png');
    this.map.set('Carpenter', '/assets/images/carpenter.png');
    this.map.set('Salon for Women', '/assets/images/beautySalon.png');
    this.map.set('Salon for kids & men', '/assets/images/menSalon.png');
    this.map.set('Pest Control', '/assets/images/pest_control.png');
    this.map.set('Painter', '/assets/images/painter.png');
    this.map.set('HomeMaid', '/assets/images/homemaid.png');
    this.map.set('Home Cleaning', '/assets/images/homeCleaning.png');
    this.map.set('Appliances Repair', '/assets/images/appliance.png');
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

 // Method to fetch offerings data
  fetchOfferings() {
    this.http.get<Response<Offering[]>>('http://localhost:8081/api/market-place/offerings').subscribe({
      next: (resp) => {
        this.offerings = resp.data ? resp.data : []; // Set the offerings data from the response
        // Map service names to corresponding image paths
        this.offerings.forEach((o) => {
          o.path = this.map.get(o.name);
        });
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
