import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'src/app/model/menu.model';
import { MenuService } from 'src/app/services/menu.service';
import { NavbarSubmenuComponent } from '../navbar-submenu/navbar-submenu.component';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.css'],
})
export class NavbarMenuComponent {
// CSS classes used to show and hide menus
private showMenuClass = ['scale-100', 'animate-fade-in-up', 'opacity-100', 'pointer-events-auto'];
private hideMenuClass = ['scale-95', 'animate-fade-out-down', 'opacity-0', 'pointer-events-none'];

constructor(public menuService: MenuService) {}

ngOnInit(): void {
  // Initialize component
}

// Toggle the state of a menu item (open/close)
public toggleMenu(menu: MenuItem): void {
  menu.selected = !menu.selected;
}

// Handle mouse enter event to show a submenu
public mouseEnter(event: any): void {
  let element = event.target.querySelector('app-navbar-submenu').children[0];
  if (element) {
    // Remove hide classes and add show classes to display the submenu
    this.hideMenuClass.forEach((c) => element.classList.remove(c));
    this.showMenuClass.forEach((c) => element.classList.add(c));
  }
}

// Handle mouse leave event to hide a submenu
public mouseLeave(event: any): void {
  let element = event.target.querySelector('app-navbar-submenu').children[0];
  if (element) {
    // Remove show classes and add hide classes to hide the submenu
    this.showMenuClass.forEach((c) => element.classList.remove(c));
    this.hideMenuClass.forEach((c) => element.classList.add(c));
  }
}

}
