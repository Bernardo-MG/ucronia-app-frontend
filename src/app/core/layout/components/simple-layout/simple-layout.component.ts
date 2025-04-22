import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarContainer } from '../../containers/navbar/navbar.container';

@Component({
  selector: 'layout-simple-layout',
  imports: [RouterModule, NavbarContainer],
  templateUrl: './simple-layout.component.html'
})
export class SimpleLayoutComponent {

}
