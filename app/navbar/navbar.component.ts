import { Component } from '@angular/core';
import { NavbarMenuComponent } from './navbar-menu/navbar-menu.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { NavbarMobileComponent } from './navbar-mobile/navbar-mobile.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = true;
  }
}
