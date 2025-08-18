
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '@app/domain/person/person';
import { CreateComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { PeopleCreationFormComponent } from '../../components/people-creation-form/people-creation-form.component';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'assoc-people-creation',
  imports: [CardModule, PeopleCreationFormComponent, ResponsiveShortColumnsDirective],
  templateUrl: './people-creation.container.html'
})
export class PeopleCreationContainer extends CreateComponent<Person> {

  private readonly service = inject(PeopleService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  protected override save(toSave: Person): Observable<Person> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: Person) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
