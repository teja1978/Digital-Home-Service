import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingScreenComponent } from './landing-screen/landing-screen.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { ViewRequestsComponent } from './view-requests/view-requests.component';

const routes: Routes = [
  
  {
    path:'',
    component: LandingScreenComponent,
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
        path: 'view-requests', 
        component: ViewRequestsComponent 
      }
    ]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
