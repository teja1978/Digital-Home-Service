import { NgClass, NgFor, NgTemplateOutlet } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SubMenuItem } from 'src/app/model/menu.model';
import { MenuService } from 'src/app/services/menu.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-navbar-mobile-submenu',
  templateUrl: './navbar-mobile-submenu.component.html',
  styleUrls: ['./navbar-mobile-submenu.component.css'],
})
export class NavbarMobileSubmenuComponent {
  // Input decorator to receive submenu data from parent component
@Input() public submenu = <SubMenuItem>{};

constructor(private menuService: MenuService) {}

ngOnInit(): void {
  // Initialize component
}

// Toggle the submenu by invoking the toggleSubMenu method of the menuService
public toggleMenu(menu: any) {
  this.menuService.toggleSubMenu(menu);
}

// Collapse all items in the submenu
private collapse(items: Array<any>) {
  items.forEach((item) => {
    item.expanded = false;
    if (item.children) this.collapse(item.children);
  });
}

// Close the mobile menu by setting showMobileMenu to false in the menuService
public closeMobileMenu() {
  this.menuService.showMobileMenu = false;
}

}
