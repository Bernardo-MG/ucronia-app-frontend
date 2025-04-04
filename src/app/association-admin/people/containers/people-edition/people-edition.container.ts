import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membership } from '@app/models/person/membership';
import { Person } from '@app/models/person/person';
import { AuthContainer } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { ArticleComponent, CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { PeopleEditionFormComponent } from '../../components/people-edition-form/people-edition-form.component';
import { PeopleInfoComponent } from '../../components/people-info/people-info.component';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'assoc-people-edition',
  imports: [CommonModule, PeopleEditionFormComponent, PeopleInfoComponent, ArticleComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './people-edition.container.html'
})
export class PeopleInfoEditionContainer extends InfoEditorStatusComponent<Person> {

  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private service = inject(PeopleService);

  private authContainer = inject(AuthContainer);

  public view: string = 'details';

  private number = -1;

  constructor() {
    super(new Person());
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
