import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent
  },
  {
    path:'',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      { 
        path: 'service-details/:id/:name',
        component: ServiceDetailsComponent 
      },
      { 
        path: 'bookings',
        component: BookingsComponent
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
