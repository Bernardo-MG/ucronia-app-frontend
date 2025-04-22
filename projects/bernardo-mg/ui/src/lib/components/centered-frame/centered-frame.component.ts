import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResponsiveShortColumnsDirective } from '../../directives/responsive-columns.directive';

/**
 * Frame with the content centered.
 */
@Component({
  selector: 'ui-centered-frame',
  imports: [RouterModule, ResponsiveShortColumnsDirective],
  templateUrl: './centered-frame.component.html'
})
export class CenteredFrameComponent {

}