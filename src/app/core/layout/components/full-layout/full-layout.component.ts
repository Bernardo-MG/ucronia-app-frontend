import { Component } from '@angular/core';
import { HeaderNavigationWrapperComponent } from '../header-navigation-wrapper/header-navigation-wrapper.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-full-layout',
  standalone: true,
  imports: [RouterModule, HeaderNavigationWrapperComponent],
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent {

}
