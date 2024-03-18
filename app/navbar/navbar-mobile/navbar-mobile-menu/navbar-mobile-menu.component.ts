import { NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarMobileSubmenuComponent } from '../navbar-mobile-submenu/navbar-mobile-submenu.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { MenuService } from 'src/app/services/menu.service';
import { SubMenuItem } from 'src/app/model/menu.model';

@Component({
  selector: 'app-navbar-mobile-menu',
  templateUrl: './navbar-mobile-menu.component.html',
  styleUrls: ['./navbar-mobile-menu.component.css'],
})
export class NavbarMobileMenuComponent {
  constructor(public menuService: MenuService) {}

  public toggleMenu(subMenu: SubMenuItem) {
    this.menuService.toggleMenu(subMenu);
  }

  public closeMenu() {
    this.menuService.showMobileMenu = false;
  }

  ngOnInit(): void {}
}
