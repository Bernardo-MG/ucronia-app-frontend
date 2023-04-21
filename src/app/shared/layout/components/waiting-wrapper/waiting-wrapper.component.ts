import { Component, Input } from '@angular/core';

@Component({
  selector: 'layout-waiting-wrapper',
  templateUrl: './waiting-wrapper.component.html'
})
export class WaitingWrapperComponent {

  @Input() public waiting = false;

}
