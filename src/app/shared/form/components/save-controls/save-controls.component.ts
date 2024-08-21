import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WaitingButtonComponent } from '@app/shared/layout/components/waiting-button/waiting-button.component';
import { JustifyBetweenDirective } from '@app/shared/style/directives/justify-between.directive';

@Component({
  selector: 'app-save-controls',
  standalone: true,
  imports: [CommonModule, WaitingButtonComponent, JustifyBetweenDirective],
  templateUrl: './save-controls.component.html'
})
export class SaveControlsComponent {

  @Input() public waiting = false;

  @Input() public saveDisabled = false;

  @Input() public cancelDisabled = false;

  @Input() public cancellable = false;

  @Output() public save = new EventEmitter<void>();

  @Output() public cancel = new EventEmitter<void>();

}
