import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '@app/core/authentication/models/role';
import { User } from '@app/core/authentication/models/user';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { Observable } from 'rxjs';
import { AccessUserService } from '../../services/access-user.service';

@Component({
  selector: 'access-user-info-editor',
  templateUrl: './access-user-info-editor.component.html'
})
export class AccessUserInfoEditorComponent extends InfoEditorComponent<User> implements OnInit {

  public view = 'list';

  private username = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: AccessUserService,
    private authContainer: AuthContainer
  ) {
    super(new User());
  }

  ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("user", "update");
    this.deletable = this.authContainer.hasPermission("user", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const usernameParam = params.get('user');
      if(usernameParam) {
        this.username = usernameParam;
      }
      this.load();
    });
  }

  public onAddRole(data: Role): void {
    this.view = "list";
  }

  public onShowAddRole() {
    this.view = "add";
  }

  public onCancelAddRole() {
    this.view = "list";
  }

  protected override delete(): void {
    this.service.delete(this.data.username).subscribe(r => {
      this.router.navigate([`/users`]);
    });
  }

  protected override read(): Observable<User> {
    return this.service.getOne(this.username);
  }

  protected override save(toSave: User): Observable<User> {
    return this.service.update(toSave.username, toSave);
  }

}
