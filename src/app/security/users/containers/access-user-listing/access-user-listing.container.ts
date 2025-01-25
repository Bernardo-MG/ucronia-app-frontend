import { Component } from '@angular/core';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { AccessUserSelectionListWidgetComponent } from '../../components/access-user-selection-list-widget/access-user-selection-list-widget.component';

@Component({
    selector: 'access-user-listing',
    imports: [AccessUserSelectionListWidgetComponent, ArticleComponent],
    templateUrl: './access-user-listing.container.html'
})
export class AccessListingContainer {

}
