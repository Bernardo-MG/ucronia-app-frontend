import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { Membership } from '@app/models/person/membership';
import { Person } from '@app/models/person/person';
import { CardModule } from '@app/shared/card/card.module';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { PeopleEditionFormComponent } from '../../components/people-edition-form/people-edition-form.component';
import { PeopleInfoComponent } from '../../components/people-info/people-info.component';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'assoc-people-edition',
  standalone: true,
  imports: [CommonModule, CardModule, PeopleEditionFormComponent, PeopleInfoComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './people-edition.container.html'
})
export class PeopleInfoEditionContainer extends InfoEditorStatusComponent<Person> implements OnInit {

  public view: string = 'details';

  private number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: PeopleService,
    private authContainer: AuthContainer
  ) {
    super(new Person());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("person", "update");
    this.deletable = this.authContainer.hasPermission("person", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const numParam = params.get('number');
      if (numParam) {
        this.number = Number(numParam);
      }
      this.load();
    });
  }

  public onActivate() {
    const user = this.data;
    if (user.membership === undefined) {
      user.membership = new Membership();
    }
    user.membership.active = true;
    user.membership.renew = true;
    this.onSave(user);
  }

  public onDeactivate() {
    const user = this.data;
    if (user.membership === undefined) {
      user.membership = new Membership();
    }
    user.membership.active = false;
    user.membership.renew = false;
    this.onSave(user);
  }

  public onEnableRenew() {
    const user = this.data;
    if (user.membership === undefined) {
      user.membership = new Membership();
    }
    user.membership.renew = true;
    this.onSave(user);
  }

  public onDisableRenew() {
    const user = this.data;
    if (user.membership === undefined) {
      user.membership = new Membership();
    }
    user.membership.renew = false;
    this.onSave(user);
  }

  public onConvertToMember() {
    const user = this.data;
    user.membership = new Membership();
    user.membership.active = true;
    user.membership.renew = true;
    this.onSave(user);
  }

  public onChangeView(newView: string) {
    this.view = newView;
  }

  protected override delete(): void {
    this.service.delete(this.data.number).subscribe(r => {
      this.router.navigate([`..`], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<Person> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: Person): Observable<Person> {
    return this.service.patch(this.data.number, toSave);
  }

}