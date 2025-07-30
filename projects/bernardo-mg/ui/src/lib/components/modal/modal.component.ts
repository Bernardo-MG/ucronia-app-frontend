
import { Component, Input, input, output } from '@angular/core';

/**
 * Modal component. To be shown should be activated outside.
 */
@Component({
  selector: 'ui-modal',
  imports: [],
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  public readonly title = input('Modal');

  @Input() public acceptText = 'Aceptar';

  public readonly name = input('modal');

  public readonly accept = output<void>();

}
