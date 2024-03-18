import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PartnerOffering } from '../model/response.model';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { UserService } from '../service/user.service';
import { HotToastService } from '@ngneat/hot-toast';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})

export class ServiceDetailsComponent implements OnInit {
// Define a property to store the username
username: string;
feedbacks: any[] = []; // Array to store feedbacks

// Initialize serviceId as null and create an empty partners array
serviceId: number | null = null;
partners: PartnerOffering[] = [];

// Initialize selectedPartner and selectedServiceName properties
selectedPartner: PartnerOffering | null = null;
selectedServiceName: string = '';

// Initialize the visibility state of the service booking modal
isServiceFormVisible = false;

// Create a form group for booking details with validation
bookingForm = new FormGroup({
  name: new FormControl('', Validators.required),
  phoneNumber: new FormControl('', Validators.required),
  address: new FormControl('', Validators.required),
  date: new FormControl('', Validators.required),
});

// Initialize minDate and today properties for date validation
minDate: string;
today: string;

// Initialize userId and partnerName properties
userId: string = "";
partnerName: string = "";

constructor(
  private http: HttpClient, 
  private route: ActivatedRoute,
  private userService: UserService,
  private toastr: ToastrService
) {
  // Initialize username property
  this.username = '';
  
  // Set minDate and today based on the current date
  this.minDate = format(new Date(), 'yyyy-MM-dd');
  this.today = format(new Date(), 'dd-MMM-yyyy');
}

fetchFeedbacks(partnerId: string, serviceId: number) {
  this.http.get<any[]>(`http://localhost:8081/api/feedback/${partnerId}/${serviceId}`)
    .subscribe({
      next: (response) => {
        this.feedbacks = response; // Store the feedback data
      },
      error: (error) => {
        console.error('Error fetching feedbacks:', error);
      }
    });
}

ngOnInit(): void {
  // Subscribe to route parameter changes
  this.route.paramMap.subscribe(params => {
    const idParam = params.get('id');
    this.serviceId = idParam ? parseInt(idParam, 10) : null;
    this.selectedServiceName = params.get('name') || '';
    if (this.serviceId !== null) {
      // Fetch partners based on the serviceId
      this.fetchPartners(this.serviceId);
    } else {
      console.error('Invalid service ID');
    }
  });

  // Subscribe to user changes from the userService
  this.userService.user$.subscribe({
    next: (user) => {
      // Set userId based on the user's ID
      this.userId = user.id;
      console.log(user);
    }
  })
}

// Function to toggle the visibility of the service booking modal
toggleServiceFormModal(): void {
  this.isServiceFormVisible = !this.isServiceFormVisible;
}

// Function to fetch partners based on the selected service ID
fetchPartners(serviceId: number): void {
  this.http.get<PartnerOffering[]>(`http://localhost:8081/api/market-place-partner/partner-offerings/by-service/${serviceId}`).subscribe({
    next: (response) => {
      // Update the partners list with the fetched data
      this.partners = response;
      if (this.partners.length > 0) {
        // Select the first partner from the list
        this.selectPartner(this.partners[0]);
      } else {
        // No partners available, set selected partner to null
        this.selectedPartner = null;
      }
    },
    error: (error) => {
      console.error('Error fetching partners:', error);
    }
  });
}

// Function to select a partner and update the partner name
selectPartner(partner: PartnerOffering): void {
  this.selectedPartner = partner;
  // Set the partner name by combining first name and last name
  this.partnerName = partner.firstName + " " + partner.lastName;
  if (this.serviceId) {
    this.fetchFeedbacks(this.selectedPartner.partnerId, this.serviceId);
  }
}


  bookService() {
    // Check if a selected partner and their ID are available
    if (this.selectedPartner && this.selectedPartner.id) {
      // Prepare the data to be sent in the POST request
      const postData = {
        userId: this.userId, // Ensure this is a string
        partnerId: this.selectedPartner.partnerId, // Partner ID
        serviceId: this.serviceId, // Service ID
        status: 'PENDING',
        name: this.bookingForm.value.name,
        phoneNumber: this.bookingForm.value.phoneNumber,
        dateOfService: this.bookingForm.value.date,
        address: this.bookingForm.value.address
      };
  
      // Log the form values and the data to be sent
      console.log(this.bookingForm.value);
      console.log('Sending POST request with data:', postData);
  
      // Send a POST request to book the service
      this.http.post<any>('http://localhost:8081/api/lead/book', postData)
      .subscribe({
        next: (data) => {
          // Reset the booking form
          this.bookingForm.reset();
          console.log('Booking successful', data);
          // Close the service booking modal
          this.toggleServiceFormModal();
        },
        error: (error) => {
          // Reset the booking form
          this.bookingForm.reset();
          // Close the service booking modal
          this.toggleServiceFormModal();
          console.error('There was an error!', error);
        }
      });
    } else {
      console.error('Selected partner or partner ID is not available');
    }
  } 
}
