import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'layout-config-dropdown',
  standalone: true,
  imports: [RouterModule, IconsModule],
  templateUrl: './config-dropdown.component.html'
})
export class ConfigDropdownComponent {

}
