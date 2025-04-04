import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'layout-modal',
  imports: [CommonModule],
  templateUrl: './modal.component.html'
})
export class ModalComponent {

  @Input() public title = 'Modal';

  @Input() public acceptText = 'Aceptar';

  @Input() public name = 'modal';

  @Output() public accept = new EventEmitter<void>();

}
