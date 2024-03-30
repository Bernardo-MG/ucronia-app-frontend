import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderNavigationWrapperComponent } from '../header-navigation-wrapper/header-navigation-wrapper.component';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-centered-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderNavigationWrapperComponent, SideMenuComponent],
  templateUrl: './centered-layout.component.html'
})
export class CenteredLayoutComponent {

}
