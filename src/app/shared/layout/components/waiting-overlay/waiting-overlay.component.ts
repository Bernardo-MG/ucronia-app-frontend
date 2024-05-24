import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IconsModule } from '@app/shared/icons/icons.module';

/**
 * Waiting overlay. When the waiting flag is set, the wrapped component is covered by an overlay, showing a waiting
 * cue and stopping interaction.
 */
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
