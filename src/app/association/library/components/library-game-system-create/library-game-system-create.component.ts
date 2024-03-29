import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { GameSystem } from '../../models/game-system';
import { GameSystemService } from '../../services/game-system.service';
import { LibraryGameSystemFormComponent } from '../library-game-system-form/library-game-system-form.component';

@Component({
  selector: 'assoc-library-game-system-create',
  standalone: true,
  imports: [ LibraryGameSystemFormComponent, ArticleComponent ],
  templateUrl: './library-game-system-create.component.html'
})
export class LibraryGameSystemCreateComponent extends CreateComponent<GameSystem> {

  constructor(
    private service: GameSystemService,
    rt: Router
  ) {
    super(rt);
  }

  protected override save(toSave: GameSystem): Observable<GameSystem> {
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: GameSystem): string {
    return `/library/gameSystem/${saved.name}`;
  }

}
