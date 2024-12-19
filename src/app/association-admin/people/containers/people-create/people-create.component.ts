import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '@app/models/person/person';
import { CardModule } from '@app/shared/card/card.module';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { PeopleService } from '../../services/people.service';
import { PeopleCreateFormComponent } from '../../components/people-create-form/people-create-form.component';

@Component({
  selector: 'assoc-people-create',
  standalone: true,
  imports: [CardModule, PeopleCreateFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './people-create.component.html'
})
export class PeopleCreateComponent extends CreateComponent<Person> {

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
