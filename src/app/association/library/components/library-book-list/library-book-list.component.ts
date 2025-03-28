import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameBook } from '@app/models/library/game-book';
import { SortingButtonComponent } from '@app/shared/sorting/components/sorting-button/sorting-button.component';
import { IconSuccessOrFailureComponent } from '@bernardo-mg/icons';
import { SortingProperty } from '@bernardo-mg/request';

@Component({
    selector: 'assoc-library-book-list',
    imports: [CommonModule, RouterModule, SortingButtonComponent, IconSuccessOrFailureComponent],
    templateUrl: './library-book-list.component.html'
})
export class LibraryBookListComponent {

  @Input() books: GameBook[] = [];

  @Input() public routeLinkAdapter: (data: GameBook) => string = (data) => '';

  @Output() public directionChange = new EventEmitter<SortingProperty>();

}
