import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Response } from '../model/response.model';
import { Service } from '../model/response.model copy';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

// Declare an EventEmitter to emit an event when a service is clicked
@Output() serviceClickedEvent = new EventEmitter<void>();
  
// Define an array to store a list of services
services: Service[] = [];

// Constructor for the component, injecting necessary dependencies
constructor(private httpClient: HttpClient, private router: Router ) { }

// ngOnInit is a lifecycle hook that runs when the component is initialized
ngOnInit(): void {
  // Make an HTTP GET request to fetch a list of services from a specific API endpoint
  this.httpClient.get<Response<Service[]>>('http://localhost:8081/api/market-place/services').subscribe((resp) => {
    // Check if the response contains data, and if so, assign it to the 'services' array
    this.services = resp.data ? resp.data : [];
    
    // Log the fetched services to the console for debugging
    console.log(this.services);
  });
}
 
// Function to handle when a service is clicked
onServiceClick(service: Service): void {
  // Emit a custom event to notify parent components that a service has been clicked
  this.serviceClickedEvent.emit();
}

}
