import { Component, Input } from '@angular/core';

@Component({
    selector: 'icon-success-or-failure',
    templateUrl: './icon-success-or-failure.component.html',
    standalone: false
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
