import { Component, HostListener, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Lead, LeadStatus, Offering } from '../model/response.model';
import { PartnerOffering } from '../model/response.model';
import { UserService } from '../service/user.service';
import { leadStatusToString } from '../utils/utils';
import { OrderService } from '../order.service';
import { WindowRefService } from '../window-ref.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {
  leads: Lead[] = [];
  LeadStatus=  LeadStatus;
  username: string;
  serviceName:string;
  partnerName:string;
  partnerPhone:string;
  
  user: any;
  currentLead: Lead | null;
  
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private orderService: OrderService,
    private winRef: WindowRefService
  ) {
    this.username = ''; // Initialize username as an empty string
    this.serviceName = ''; // Initialize serviceName as an empty string
    this.partnerName = ''; // Initialize partnerName as an empty string
  }

  ngOnInit() {
    // Subscribe to user changes and update user-related data
    this.userService.user$.subscribe((user) => {
      this.username = user?.firstName + " " + user?.lastName; // Concatenate first name and last name
      this.user = user; // Store the user data
      this.fetchLeads(); // Fetch leads data for the user
    });
  }

  // Flag to control the visibility of the feedback dialog modal
  isFeedbackDialogVisible = false;

  // Form group for the feedback form with validation
  feedbackForm = new FormGroup({
    name: new FormControl({value: '', disabled: true}, Validators.required),
    feedback: new FormControl('', Validators.required),
  });

  // Function to toggle the feedback dialog modal
  toggleFeedbackDialogModal(lead: Lead | null): void {
    this.isFeedbackDialogVisible = !this.isFeedbackDialogVisible;

    if (lead) {
      // Set the name in the form (assuming lead has a 'userName' field)
      this.feedbackForm.get('name')?.setValue(lead.name!);
      this.currentLead = lead;

    } else {
      this.feedbackForm.reset();
      this.currentLead = null;
    }
  }

  // Function to submit feedback
  submitFeedback() {
    if (this.feedbackForm.valid) {
      console.log(this.feedbackForm.value);


      let body={
        partnerid:this.currentLead?.partnerid,
        serviceid: this.currentLead?.serviceid,
        username: this.currentLead?.name,
        leadId: this.currentLead?.id,
        feedbacktext: this.feedbackForm.value.feedback,
        rating: '1',
        feedbackDate: format(new Date(), 'yyyy-MM-dd')
      }


      const feedbackData = this.feedbackForm.value;
      const apiUrl = 'http://localhost:8081/api/feedback/add';

      this.http.post(apiUrl, body).subscribe({
        next: (response) => {
          console.log('Feedback submitted successfully', response);
          this.fetchLeads();
          this.toggleFeedbackDialogModal(null); // Close the modal
          // Optionally, show a success message to the user
        },
        error: (error) => {
          console.error('Error submitting feedback', error);
          // Optionally, show an error message to the user
        }
      });
      //  this.toggleFeedbackDialogModal(null);
    }
  }


// Fetch leads data for the user
  fetchLeads() {
    this.http
      .get<Lead[]>(`http://localhost:8081/api/lead/find/${this.user.id}`)
      .subscribe({
        next: (resp) => {
          this.leads = resp; // Store fetched lead data in the 'leads' array

          // Loop through the leads to fetch service and partner names
          for (const lead of this.leads) {
            this.fetchServiceName(lead); // Fetch service name for the lead
            this.fetchPartnerName(lead); // Fetch partner name for the lead
          }
        },
        error: (error) => {
          console.error('There was an error fetching the leads!', error);
        }
      });
  }
  // Function to fetch service name for a lead
  fetchServiceName(lead: Lead) {
    this.http
      .get<Offering>(`http://localhost:8081/api/market-place/offerings/${lead.serviceid}`)
      .subscribe({
        next: (resp) => {
          this.serviceName = resp.name; // Set the 'serviceName' property based on the response
        },
        error: (error) => {
          console.error(`Error fetching service name for lead ${lead.id}`, error);
        }
      });
  }

// Function to convert lead status to a string
  leadStatusToString(status: LeadStatus) {
    return leadStatusToString(status); // Call a function (assuming it exists) to convert lead status to a string
  }

// Payment-related properties and options
  paymentId: string; // Payment ID
  error: string; // Error message

  options = {
    "key": "",
    "amount": "",
    "currency": "INR",
    "payment_capture": "automatic",
    "refund_speed": "optimum",
    "name": "LocalFixPros",
    "description": "Local Services Market Place",
    "image": "/assets/images/x.png",
    "order_id":"",
    "handler": function (response: any){
      // Custom event handler for payment success
      var event = new CustomEvent("payment.success",
        {
          detail: response,
          bubbles: true,
          cancelable: true
        }
      );
      window.dispatchEvent(event); // Dispatch the custom event
    },
    "prefill": {
      "name": "LocalFixPros",
      "email": "localfixpros@lfp.com",
      "contact": "8490007550"
    },
    "notes": {
      "address": "Local Fix Pros Pvt Limited"
    },
    "theme": {
      "color": "#3399cc"
    }
  };

// Method to initiate payment for a lead
  pay(lead: Lead): void {
    this.paymentId = ''; // Initialize payment ID
    this.error = ''; // Clear any previous error messages

    // Create an order for the payment using the OrderService
    this.orderService.createOrder(lead.totalAmount).subscribe(
      data => {
        // Set payment options based on the order data
        this.options.key = data.secretId; // Set the payment key
        this.options.order_id = data.razorpayOrderId; // Set the Razorpay order ID
        this.options.amount = lead.totalAmount + ""; // Set the payment amount as a string

        // Define a custom handler function for payment success
        this.options.handler = function (response: any) {
          // Create a custom event for payment success and include relevant details
          var event = new CustomEvent("payment.success",
            {
              detail: {
                response: response,
                lead: lead
              },
              bubbles: true,
              cancelable: true
            }
          );
          window.dispatchEvent(event); // Dispatch the custom event
        }

        // Create a new Razorpay instance with the configured options and open the payment dialog
        const rzp1 = new this.winRef.nativeWindow.Razorpay(this.options);
        rzp1.open();

        // Handle payment failure
        rzp1.on('payment.failed', function (response: any){
          // TODO: Store this information on the server or handle as needed
          console.log(response);
          console.log(response.error.code);
          console.log(response.error.description);
          console.log(response.error.source);
          console.log(response.error.step);
          console.log(response.error.reason);
          console.log(response.error.metadata.order_id);
          console.log(response.error.metadata.payment_id);
        });
      },
      err => {
        this.error = err.error.message; // Handle any errors returned from creating the order
      }
    );
  }
// Method to handle payment success event
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    console.log(event);
    let lead = event?.detail?.lead; // Extract the lead from the event details

    // Update the lead status to 'COMPLETE' using an HTTP PUT request
    this.http
      .put<Lead>(`http://localhost:8081/api/lead/updateLeadStatus/${lead.id}/COMPLETE`, {})
      .subscribe({
        next: () => {
          this.fetchLeads(); // Fetch updated leads data after the status update
        },
        error: () => {
          this.fetchLeads(); // Fetch updated leads data even if there is an error
        }
      });
  }

// Method to fetch partner name for a lead
  fetchPartnerName(lead: Lead) {
    this.http
      .get<any>(`http://localhost:8081/api/market-place-partner/partner-offerings/find/${lead.partnerid}`)
      .subscribe({
        next: (resp) => {
          for (const offering of resp) {
            this.partnerName = offering.firstName + ' ' + offering.lastName; // Set partner name
            this.partnerPhone = offering.phoneNumber; // Set partner phone number
          }
        },
        error: (error) => {
          console.error(`Error fetching partner name for lead ${lead.id}`, error);
        }
      });
  }
}


