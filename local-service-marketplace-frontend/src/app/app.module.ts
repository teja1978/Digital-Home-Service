import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { OAuthModule } from 'angular-oauth2-oidc';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { BookingsComponent } from './bookings/bookings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaincontentComponent } from './maincontent/maincontent.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/',
        realm: 'market-place',
        clientId: 'market-place-frontend'
      },
      initOptions: {
        checkLoginIframe: false,
      },
      shouldAddToken: (request) => {
        const { method, url } = request;

        const acceptablePaths = ['/api'];
        const isAcceptablePathMatch = acceptablePaths.some((path) =>
          url.includes(path)
        );
    
        return isAcceptablePathMatch;
      }
    
    });
}

@NgModule({
  declarations: [
    AppComponent,
    NavigationBarComponent,
    LandingPageComponent,
    HomeComponent,
    ServiceDetailsComponent,
    BookingsComponent,
    MaincontentComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    ToastrModule.forRoot(),
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
