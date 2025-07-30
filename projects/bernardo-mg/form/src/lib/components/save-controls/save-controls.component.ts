
import { Component, input, output } from '@angular/core';
import { JustifyBetweenDirective, WaitingDirective } from '@bernardo-mg/ui';

@Component({
  selector: 'form-save-controls',
  imports: [WaitingDirective, JustifyBetweenDirective],
  templateUrl: './save-controls.component.html'
})
export class SaveControlsComponent {

  public readonly waiting = input(false);

  public readonly saveDisabled = input(false);

  public readonly cancelDisabled = input(false);

  public readonly cancellable = input(false);

  public readonly reject = output<void>();

}
