import { Component, OnInit } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'access-role-frontpage',
  templateUrl: './access-role-frontpage.component.html'
})
export class AccessFrontpageComponent implements OnInit {

  public createPermission = false;

  public addIcon = faPlus;

  constructor(
    private authContainer: AuthContainer
  ) {}

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("role", "create");
  }

}
