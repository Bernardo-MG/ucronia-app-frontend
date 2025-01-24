import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';

@Component({
    selector: 'layout-centered-frame',
    imports: [RouterModule, ResponsiveShortColumnsDirective],
    templateUrl: './centered-frame.component.html'
})
export class CenteredFrameComponent {

}
