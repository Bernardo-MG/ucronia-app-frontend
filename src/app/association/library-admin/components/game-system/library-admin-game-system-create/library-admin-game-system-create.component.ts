import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { GameSystem } from '../../../models/game-system';
import { GameSystemAdminService } from '../../../services/game-system-admin.service';
import { LibraryAdminGameSystemFormComponent } from '../library-admin-game-system-form/library-admin-game-system-form.component';

@Component({
  selector: 'assoc-library-admin-game-system-create',
  standalone: true,
  imports: [ LibraryAdminGameSystemFormComponent, ArticleComponent ],
  templateUrl: './library-admin-game-system-create.component.html'
})
export class LibraryAdminGameSystemCreateComponent extends CreateComponent<GameSystem> {

  constructor(
    private service: GameSystemAdminService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: GameSystem): Observable<GameSystem> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: GameSystem): string {
    return '/library/admin';
  }

}
