import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { NavbarMobileMenuComponent } from './navbar-mobile-menu/navbar-mobile-menu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-navbar-mobile',
  templateUrl: './navbar-mobile.component.html',
  styleUrls: ['./navbar-mobile.component.css'],
})
export class NavbarMobileComponent {
  constructor(public menuService: MenuService) {}

  ngOnInit(): void {}

  public toggleMobileMenu(): void {
    this.menuService.showMobileMenu = false;
  }

}
