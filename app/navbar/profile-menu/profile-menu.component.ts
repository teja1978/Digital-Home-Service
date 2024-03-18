import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ClickOutsideDirective } from 'src/app/diectives/click-outside.directive';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.css'],
})
export class ProfileMenuComponent {

  public isMenuOpen = false;

  constructor() {}

  ngOnInit(): void {}

  public toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

}
