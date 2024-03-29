import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'layout-waiting-wrapper',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './waiting-wrapper.component.html'
})
export class WaitingWrapperComponent {

  @Input() public waiting = false;

}
