import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {  FormControl, FormGroup, Validators } from '@angular/forms';
import { Offering } from '../model/offering.model';
import { PartnerOfferingService } from '../partner-offering.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-single-card',
  templateUrl: './service-single-card.component.html',
  styleUrls: ['./service-single-card.component.css']
})


export class ServiceSingleCardComponent implements OnInit{
  @Input() offering!: Offering; // Input property representing the offering for this component
  @Input() partnerId!: string; // Input property representing the partner's ID
  @Input() buttonText!: string; // Input property representing the button text
  
  map: Map<string, string> = new Map<string, string>(); // Map to store service names and corresponding image paths
  isRegistered: boolean = false; // Flag to indicate if the partner is registered for this offering
  path: string | undefined; // Path to the service's image
  
  constructor(private partnerOfferingService: PartnerOfferingService, private http: HttpClient, private router: Router) {
    // Initialize the map with service names and image paths
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
    // Check if the partner is registered for the current offering
    this.checkIfRegistered();
    // Set the 'path' property based on the offering's name
    this.path = this.map.get(this.offering.name);
  }
  
  checkIfRegistered() {
    // Check if the partner is registered for any offerings and set 'isRegistered' accordingly
    this.partnerOfferingService.checkIfRegistered(this.partnerId).subscribe(offerings => {
      // Check if the current offering is in the list of offerings the partner is registered for
      this.isRegistered = offerings.some(offering => offering.offering.id === this.offering.id);
      console.log(offerings);
      console.log("Dasdasdasd");
      console.log(this.isRegistered);
      console.log("Dasdasdasd");
    });
  }
  

  isServiceFormVisible: boolean = false; // Flag to control the visibility of the service registration form

  profileForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    service: new FormControl(''), // The selected service, may not be editable
    address: new FormControl('', Validators.required),
    perHourBasePrice: new FormControl('', Validators.required),
    fieldExperience: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
  });
  
  toggleServiceFormModal(): void {
    // Toggle the visibility of the service registration form
    if (this.buttonText === 'Register') {
      this.isServiceFormVisible = !this.isServiceFormVisible;
      console.log(this.isServiceFormVisible); // Log the visibility status
    } else {
      // Handle the case when the button text is not 'Register', e.g., 'View Leads'
      // You can add the logic here to handle viewing leads
    }
  }
  
  viewRequests() {
    // Navigate to the view requests page with query parameters
    this.router.navigate(['/view-requests'], {
      queryParams: {
        partnerId: this.partnerId, // Pass the partnerId as a query parameter
        offeringId: this.offering.id, // Pass the offeringId as a query parameter
      }
    });
  }
  



onSubmit() {
  // Prepare the data to send to the backend using HttpClient
  let body = {
    partnerId: this.partnerId,
    firstName: this.profileForm.value.firstName,
    lastName: this.profileForm.value.lastName,
    gender: this.profileForm.value.gender,
    age: this.profileForm.value.age,
    phoneNumber: this.profileForm.value.phoneNumber,
    service: this.offering.name,
    address: this.profileForm.value.address,
    perHourBasePrice: this.profileForm.value.perHourBasePrice,
    fieldExperience: this.profileForm.value.fieldExperience,
    companyOrganization: this.profileForm.value.company,
  };

  // Log the form validation status and the data being sent
  console.log(this.profileForm.valid); // Check if the form is valid
  console.log(body); // Log the data being sent to the backend

  // Send a POST request to register the partner offering
  this.partnerOfferingService.register(body, this.offering.id).subscribe({
    next: () => {
      // Registration was successful
      this.isRegistered = true; // Set a flag indicating successful registration
      this.toggleServiceFormModal(); // Close the registration form modal
    },
    error: () => {
      // Registration encountered an error
      this.toggleServiceFormModal(); // Close the registration form modal
    },
  });
}


  }
