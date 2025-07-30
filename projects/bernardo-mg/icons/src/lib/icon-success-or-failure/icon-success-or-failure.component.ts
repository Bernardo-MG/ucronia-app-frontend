
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconFailureComponent } from '../icon-failure/icon-failure.component';
import { IconSuccessComponent } from '../icon-success/icon-success.component';

@Component({
    selector: 'icon-success-or-failure',
    imports: [FontAwesomeModule, IconFailureComponent, IconSuccessComponent],
    templateUrl: './icon-success-or-failure.component.html'
})
export class IconSuccessOrFailureComponent {

  private _success = true;

  @Input() public set success(success: boolean | undefined) {
    if (success) {
      this._success = success;
    } else {
      this._success = false;
    }
  }

  public get success(): boolean {
    return this._success;
  }

}
