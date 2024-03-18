import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarMenuComponent } from './navbar/navbar-menu/navbar-menu.component';
import { NavbarMobileComponent } from './navbar/navbar-mobile/navbar-mobile.component';
import { NavbarSubmenuComponent } from './navbar/navbar-submenu/navbar-submenu.component';
import { ProfileMenuComponent } from './navbar/profile-menu/profile-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarMenuComponent } from './sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarSubmenuComponent } from './sidebar/sidebar-submenu/sidebar-submenu.component';
import { NavbarMobileMenuComponent } from './navbar/navbar-mobile/navbar-mobile-menu/navbar-mobile-menu.component';
import { NavbarMobileSubmenuComponent } from './navbar/navbar-mobile/navbar-mobile-submenu/navbar-mobile-submenu.component';
import { MaincontentComponent } from './maincontent/maincontent.component';
import { ServiceSingleCardComponent } from './service-single-card/service-single-card.component';
import { FormsModule } from '@angular/forms';
import { ViewRequestsComponent } from './view-requests/view-requests.component';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080/',
        realm: 'market-place-partner',
        clientId: 'market-place-partner-frontend'
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
    LandingScreenComponent,
    NavigationBarComponent,
    HomeComponent,
    SideBarComponent,
    SidebarComponent,
    SidebarMenuComponent,
    SidebarSubmenuComponent,
    NavbarComponent,
    NavbarMenuComponent,
    NavbarMobileComponent,
    NavbarSubmenuComponent,
    ProfileMenuComponent,
    NavbarMobileMenuComponent,
    NavbarMobileSubmenuComponent,
    MaincontentComponent,
    ServiceSingleCardComponent,
    ViewRequestsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    KeycloakAngularModule,
    ReactiveFormsModule,
    FormsModule,
    FormsModule
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
