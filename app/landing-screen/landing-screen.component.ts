import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-landing-screen',
  templateUrl: './landing-screen.component.html',
  styleUrls: ['./landing-screen.component.css']
})
export class LandingScreenComponent {

  constructor(private keycloakService: KeycloakService ){

  }

  loginAsPartner() {
    this.keycloakService.login({ redirectUri : "http://localhost:4201/home" });
  }

}
