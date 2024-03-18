import { Component, Input } from '@angular/core';
import { SubMenuItem } from 'src/app/model/menu.model';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-sidebar-submenu',
  templateUrl: './sidebar-submenu.component.html',
  styleUrls: ['./sidebar-submenu.component.css']
})
export class SidebarSubmenuComponent {

 // Input property to receive submenu data from a parent component
 @Input() public submenu: SubMenuItem = {};

 // Constructor for the component, injecting the MenuService
 constructor(public menuService: MenuService) {}

 // ngOnInit is a lifecycle hook that runs when the component is initialized
 ngOnInit(): void {
   // Perform any initialization logic here if needed
 }

 // Function to toggle the submenu
 public toggleMenu(menu: any) {
   // Call the toggleSubMenu method from the MenuService to toggle the submenu
   this.menuService.toggleSubMenu(menu);
 }

 // Private function to collapse all submenu items
 private collapse(items: Array<any>) {
   items.forEach((item) => {
     item.expanded = false;
     // Recursively collapse child items if they exist
     if (item.children) this.collapse(item.children);
   });
 }


}
