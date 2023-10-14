import { Component, OnInit } from '@angular/core';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'access-user-frontpage',
  templateUrl: './access-user-frontpage.component.html'
})
export class AccessFrontpageComponent implements OnInit {

  public createPermission = false;

  public totalPages = 0;

  public addIcon = faPlus;

  constructor(
    private authContainer: AuthContainer
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("user", "create");
  }

}
