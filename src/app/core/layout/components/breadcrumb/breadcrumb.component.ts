import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbLink } from '../../model/breadcrumb-link';

@Component({
  selector: 'layout-breadcrumb',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html'
})
export class BreadcrumbComponent {

  @Input() public levels: BreadcrumbLink[] = [];

}
