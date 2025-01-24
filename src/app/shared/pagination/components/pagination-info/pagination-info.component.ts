import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PaginationNavigationComponent } from '@app/shared/pagination/components/pagination-navigation/pagination-navigation.component';
import { JustifyCenterDirective } from '@app/shared/style/directives/justify-center.directive';

@Component({
    selector: 'pagination-info',
    imports: [PaginationNavigationComponent, JustifyCenterDirective],
    templateUrl: './pagination-info.component.html'
})
export class PaginationInfoComponent {

  @Input() public waiting = false;

  @Input() public current = 1;

  @Input() public pages = 0;

  @Input() public totalElements = 0;

  @Output() public goTo = new EventEmitter<number>();

}
