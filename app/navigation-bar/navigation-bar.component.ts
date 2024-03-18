import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { UserService } from '../user.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css']
})
export class NavigationBarComponent implements OnInit {
  isDropdownOpen = false; // Flag to control dropdown visibility
  isLoggedIn = false; // Flag to check if the user is logged in
  token: string = ""; // JWT token (if logged in)
  name: string = ""; // User's name (if logged in)

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
    private userService: UserService
  ) { }

  async ngOnInit() {
    // Check if the user is logged in using Keycloak
    let loggedIn = await this.keycloakService.isLoggedIn();

    if (loggedIn) {
      // Retrieve the user's JWT token if logged in
      let token = await this.keycloakService.getToken();
      this.token = token;
      this.isLoggedIn = loggedIn;

      // Load user profile data
      let user = await this.keycloakService.loadUserProfile();
      this.userService.loggedInUser(user); // Notify the UserService about the logged-in user
      this.name = user?.firstName + " " + user?.lastName; // Set the user's name
    }
  }

  // Toggle the dropdown menu's visibility
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // Log in as a partner
  loginAsPartner() {
    this.keycloakService.login({ redirectUri: "http://localhost:4201/home" });
  }

  // Log out the user
  logout() {
    this.keycloakService.logout("http://localhost:4201/");
  }

  // Navigate to the home page
  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
