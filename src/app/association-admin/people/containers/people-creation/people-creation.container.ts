import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '@app/models/person/person';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent, CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { PeopleCreationFormComponent } from '../../components/people-creation-form/people-creation-form.component';
import { PeopleService } from '../../services/people.service';

@Component({
    selector: 'assoc-people-creation',
    imports: [PeopleCreationFormComponent, ArticleComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
    templateUrl: './people-creation.container.html'
})
export class PeopleCreationContainer extends CreateComponent<Person> {

  constructor(
    private service: PeopleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  protected override save(toSave: Person): Observable<Person> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: Person) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
