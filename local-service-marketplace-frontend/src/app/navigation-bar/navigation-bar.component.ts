import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  isDropdownOpen = false; // Flag to track whether the dropdown is open
  isLoggedIn = false; // Flag to track user login status
  token: string = ""; // User token
  name: string = ""; // User name

  constructor(private keycloakService: KeycloakService, private router: Router, private userService: UserService) { }
  
  async ngOnInit() {
    // Check if the user is logged in
    let loggedIn = await this.keycloakService.isLoggedIn();
    
    if (loggedIn) {
      // If logged in, fetch user token and details
      let token = await this.keycloakService.getToken();
      this.token = token;
      this.isLoggedIn = loggedIn;
      
      // Load user profile and display user details
      let user = await this.keycloakService.loadUserProfile();
      console.log(user);
      
      this.userService.loggedInUser(user); // Notify the UserService of the logged-in user
      this.name = user?.firstName + " " + user?.lastName; // Set user's full name
    }
  }
  
  // Method to toggle the dropdown menu
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Method to initiate login
  login() {
    this.keycloakService.login({ redirectUri : "http://localhost:4200/home" });
  }

  // Method to initiate logout
  logout() {
    this.keycloakService.logout("http://localhost:4200/");
  }

  // Method to login as a partner (open a new window)
  loginAsPartner(){
      window.open("http://localhost:4201/", "_blank");
  }

  // Method to navigate to the bookings page
  booking(){
    this.router.navigate(['/bookings']);
  }

  // Method to navigate to the home page
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
