import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { SubMenuItem } from 'src/app/model/menu.model';

@Component({
  selector: 'app-navbar-submenu',
  templateUrl: './navbar-submenu.component.html',
  styleUrls: ['./navbar-submenu.component.css'],
})
export class NavbarSubmenuComponent implements OnInit {
  @Input() public submenu = <SubMenuItem[]>{};

  constructor() {}

  ngOnInit(): void {}
}
