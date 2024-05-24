import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';

@Component({
  selector: 'layout-waiting-overlay',
  standalone: true,
  imports: [CommonModule, IconsModule],
  templateUrl: './waiting-overlay.component.html',
  styleUrl: './waiting-overlay.component.sass'
})
export class WaitingOverlayComponent {

  @Input() public waiting = false;

}
