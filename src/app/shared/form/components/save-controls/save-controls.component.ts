import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { JustifyBetweenDirective, WaitingButtonComponent } from '@bernardo-mg/layout';

@Component({
    selector: 'app-save-controls',
    imports: [CommonModule, WaitingButtonComponent, JustifyBetweenDirective],
    templateUrl: './save-controls.component.html'
})
export class SaveControlsComponent {

  @Input() public waiting = false;

  @Input() public saveDisabled = false;

  @Input() public cancelDisabled = false;

  @Input() public cancellable = false;

  @Output() public save = new EventEmitter<void>();

  @Output() public reject = new EventEmitter<void>();

}
