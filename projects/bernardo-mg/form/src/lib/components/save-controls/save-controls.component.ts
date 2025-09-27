
import { Component, input, output } from '@angular/core';
import { JustifyBetweenDirective } from '@bernardo-mg/ui';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'form-save-controls',
  imports: [ButtonModule, JustifyBetweenDirective],
  templateUrl: './save-controls.component.html'
})
export class SaveControlsComponent {

  public readonly waiting = input(false);

  public readonly saveDisabled = input(false);

  public readonly cancelDisabled = input(false);

  public readonly cancellable = input(false);

  public readonly reject = output<void>();

}
