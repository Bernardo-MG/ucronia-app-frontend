
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Membership } from '@app/domain/person/membership';
import { Person } from '@app/domain/person/person';
import { AuthContainer } from '@bernardo-mg/authentication';
import { ControlButtonsComponent, InfoEditorStatusComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { TabsModule } from 'primeng/tabs';
import { Observable } from 'rxjs';
import { PeopleEditionFormComponent } from '../../components/people-edition-form/people-edition-form.component';
import { PeopleEditionMembershipButtonsComponent } from '../../components/people-edition-membership-buttons/people-edition-membership-buttons.component';
import { PeopleInfoDetailsComponent } from '../../components/people-info-details/people-info-details.component';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'assoc-people-edition',
  imports: [CommonModule, CardModule, TabsModule, PeopleEditionFormComponent, ResponsiveShortColumnsDirective, PeopleInfoDetailsComponent, ControlButtonsComponent, PeopleEditionMembershipButtonsComponent],
  templateUrl: './people-edition.container.html'
})
export class PeopleInfoEditionContainer extends InfoEditorStatusComponent<Person> {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(PeopleService);

  public view: string = 'details';

  public get isMember() {
    return this.data.membership !== null;
  }

  private number = -1;

  constructor() {
    const authContainer = inject(AuthContainer);

    super(new Person());
    // Check permissions
    this.editable = authContainer.hasPermission("person", "update");
    this.deletable = authContainer.hasPermission("person", "delete");

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
