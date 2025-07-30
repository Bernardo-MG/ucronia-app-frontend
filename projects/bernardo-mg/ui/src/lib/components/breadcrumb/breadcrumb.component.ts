
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbLink } from '../../models/breadcrumb-link';

@Component({
  selector: 'ui-breadcrumb',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {

  @Input() public levels: BreadcrumbLink[] = [];

}
