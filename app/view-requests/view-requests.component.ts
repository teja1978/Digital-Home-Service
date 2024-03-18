import { Component, OnInit } from '@angular/core';
import { LeadService } from '../findLeadsByPartnerIdAndServiceId.service';
import { Lead, LeadStatus } from '../model/lead.model';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { leadStatusToString } from '../utils/utils';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';

@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {

// Array to store a list of leads
leads: Lead[] = [];

// Variables to store partner and service IDs
partnerId: any;
serviceId: any;

// Flag to control the visibility of the amount dialog modal
isAmountDialogVisible = false;

// Form group for the amount input with validation
amountForm = new FormGroup({
  amount: new FormControl('', Validators.required),
});

// Variable to store the currently selected lead or null
currentLead: Lead | null;

// Variable to store user information
user: any;

// Variable to store the user's full name
name: string;


  // Function to convert LeadStatus enum to a string representation
leadStatusToString(status: LeadStatus) {
  // Call a function or method that converts the LeadStatus enum to a string
  return leadStatusToString(status);
}

// Constructor for the component, injecting necessary dependencies
constructor( private http: HttpClient,private leadService: LeadService, private route: ActivatedRoute, private userService: UserService) {}

// Function to accept a lead
acceptLead(lead: Lead) {
  // Call the leadService to update the lead's status to 'ACCEPTED'
  this.leadService.updateLeadStatus(lead.id, LeadStatus.ACCEPTED).subscribe(() => {
    // After updating the lead status, reload the leads
    this.loadLeads();  
  }, error => {
    // Handle errors by logging them to the console
    console.error('Error updating lead status', error);
  });
}

// Function to reject a lead
rejectLead(lead: Lead) {
  // Call the leadService to update the lead's status to 'REJECTED'
  this.leadService.updateLeadStatus(lead.id, LeadStatus.REJECTED).subscribe(() => {
    // After updating the lead status, reload the leads
    this.loadLeads();  
  }, error => {
    // Handle errors by logging them to the console
    console.error('Error updating lead status', error);
  });
}

// Function to load leads based on partnerId and serviceId
loadLeads() {
  // Call the leadService to fetch leads based on partnerId and serviceId
  this.leadService.findLeadsByPartnerIdAndServiceId(this.partnerId, this.serviceId)
    .subscribe(data => {
      // Assign the fetched leads to the 'leads' property
      this.leads = data;
    }, error => {
      // Handle errors by logging them to the console
      console.error('Error fetching leads', error);
    });
}

// Function to toggle the visibility of the amount dialog modal and set the currentLead
toggleAmountDialogModal(currentLead: Lead | null): void {
  // Toggle the visibility of the modal
  this.isAmountDialogVisible = !this.isAmountDialogVisible;
  // Set the currentLead to the provided lead or null
  this.currentLead = currentLead;
}

// Function to start a service for a lead
startService(lead: Lead) {
  // Call the leadService to update the lead's status to 'IN_SERVICE'
  this.leadService.updateLeadStatus(lead.id, LeadStatus.IN_SERVICE).subscribe(() => {
    // After updating the lead status, reload the leads
    this.loadLeads();  
  }, error => {
    // Handle errors by logging them to the console
    console.error('Error updating lead status', error);
  });
}


  // Function to submit the amount for a current lead
submitAmount() {
  // Log the amountForm value to the console for debugging
  console.log(this.amountForm.value);

  // Check if there is a currentLead and the amount is provided
  if (this.currentLead && this.amountForm.value.amount) {
    // Update the totalAmount property of the currentLead with the provided amount
    this.currentLead.totalAmount = +this.amountForm.value.amount;

    // Set the status of the currentLead to 'PAYMENT_PENDING'
    this.currentLead.status = LeadStatus.PAYMENT_PENDING;

    // Call the leadService to update the totalAmount of the currentLead
    this.leadService.updateTotalAmount(this.currentLead).subscribe({
      // On successful update, reset the amountForm and close the modal
      next: () => {
        this.amountForm.reset();
        this.toggleAmountDialogModal(null);
      },
      // On error, also reset the amountForm and close the modal
      error: () => {
        this.amountForm.reset();
        this.toggleAmountDialogModal(null);
      }
    });
  }
}


// ngOnInit is a lifecycle hook that runs when the component is initialized
ngOnInit(): void {
  // Retrieve query parameters from the route
  this.route.queryParams.subscribe((params) => {
    // Extract partnerId and offeringId from the query parameters
    this.partnerId = params['partnerId'];
    this.serviceId = params['offeringId'];

    // Load leads based on the retrieved partnerId and serviceId
    this.loadLeads();
  });

  // Subscribe to the user$ observable to get the user information
  this.userService.user$.subscribe((user) => {
    // Assign the user object to the 'user' property
    this.user = user;

    // Construct the user's full name by combining first and last names
    this.name = user?.firstName + " " + user?.lastName;
  })
}

 

}








