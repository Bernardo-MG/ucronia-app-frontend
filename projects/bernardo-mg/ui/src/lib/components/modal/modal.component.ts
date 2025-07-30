
import { Component, EventEmitter, Input, Output } from '@angular/core';

/**
 * Modal component. To be shown should be activated outside.
 */
@Component({
  selector: 'ui-modal',
  imports: [],
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @Input() public title = 'Modal';

  @Input() public acceptText = 'Aceptar';

  @Input() public name = 'modal';

  @Output() public readonly accept = new EventEmitter<void>();

}
