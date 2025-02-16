import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameSystem } from '@app/models/library/game-system';
import { CardBodyComponent } from '@app/shared/card/components/card-body/card-body.component';
import { CardComponent } from '@app/shared/card/components/card/card.component';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { ArticleComponent } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { LibraryAdminGameSystemFormComponent } from '../../components/library-admin-game-system-form/library-admin-game-system-form.component';
import { GameSystemAdminService } from '../../services/game-system-admin.service';

@Component({
    selector: 'assoc-library-admin-game-system-creation',
    imports: [LibraryAdminGameSystemFormComponent, ArticleComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
    templateUrl: './library-admin-game-system-creation.container.html'
})
export class LibraryAdminGameSystemCreateContainer extends CreateComponent<GameSystem> {

  constructor(
    private service: GameSystemAdminService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    super();
  }

  protected override save(toSave: GameSystem): Observable<GameSystem> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: GameSystem) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['../..'], { relativeTo: this.route });
  }

}
