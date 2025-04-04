import { Component } from '@angular/core';
import { ArticleComponent } from '@bernardo-mg/layout';
import { AccessUserSelectionListWidgetContainer } from '../access-user-selection-list-widget/access-user-selection-list-widget.container';

@Component({
    selector: 'access-user-listing',
    imports: [AccessUserSelectionListWidgetContainer, ArticleComponent],
    templateUrl: './access-user-listing.container.html'
})
export class AccessListingContainer {

}
