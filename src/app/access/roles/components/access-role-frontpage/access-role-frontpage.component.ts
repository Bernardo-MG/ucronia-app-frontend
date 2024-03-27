import { Component, OnInit } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { AccessRoleSelectionListComponent } from '../access-role-selection-list/access-role-selection-list.component';

@Component({
  selector: 'access-role-frontpage',
  standalone: true,
  imports: [LayoutModule, AccessRoleSelectionListComponent],
  templateUrl: './access-role-frontpage.component.html'
})
export class AccessFrontpageComponent implements OnInit {

  public createPermission = false;

  constructor(
    private authContainer: AuthContainer
  ) {}

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("role", "create");
  }

}
