import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfferingService } from '../offering.service';
import { Offering } from '../model/offering.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-maincontent',
  templateUrl: './maincontent.component.html',
  styleUrls: ['./maincontent.component.css']
})
export class MaincontentComponent implements OnInit{

// Initialize an empty array to store offerings
offerings: Offering[] = [];

// Initialize partnerId as an empty string
partnerId: string = '';

constructor(private offeringService: OfferingService, private userService: UserService) {
   
}

ngOnInit(): void {
  // Subscribe to the user observable to get user information
  this.userService.user$.subscribe({
    next: (user) => {
      // Assign the user's ID to the partnerId variable
      this.partnerId = user.id;
      console.log(user);
    }
  })

  // Fetch all available services and subscribe to the response
  this.offeringService.findAllServices().subscribe({
    next: (resp) => {
      // Assign the response data (list of offerings) to the offerings array
      this.offerings = resp.data;
    },
    error: () => {
      // Handle any errors that occur during the service fetch
    }
  })
}


}
