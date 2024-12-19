import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Person } from '@app/models/person/person';
import { CardModule } from '@app/shared/card/card.module';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { PeopleCreationFormComponent } from '../../components/people-creation-form/people-creation-form.component';
import { PeopleService } from '../../services/people.service';

@Component({
  selector: 'assoc-people-creation',
  standalone: true,
  imports: [CardModule, PeopleCreationFormComponent, ArticleComponent, ResponsiveShortColumnsDirective],
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
