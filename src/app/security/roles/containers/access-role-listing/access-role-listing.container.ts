import { Component, OnInit } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { AccessRoleSelectionListWidgetComponent } from '../../components/list/access-role-selection-list-widget/access-role-selection-list-widget.component';

@Component({
  selector: 'access-role-listing',
  standalone: true,
  imports: [AccessRoleSelectionListWidgetComponent, ArticleComponent],
  templateUrl: './access-role-listing.container.html'
})
export class AccessRoleListingContainer implements OnInit {

  public createPermission = false;

  constructor(
    private authContainer: AuthContainer
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("role", "create");
  }

}
