
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameSystem } from '@app/domain/library/game-system';
import { CreateComponent } from '@bernardo-mg/form';
import { ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { CardModule } from 'primeng/card';
import { Observable } from 'rxjs';
import { LibraryAdminGameSystemFormComponent } from '../../components/library-admin-game-system-form/library-admin-game-system-form.component';
import { GameSystemAdminService } from '../../services/game-system-admin.service';

@Component({
  selector: 'assoc-library-admin-game-system-creation',
  imports: [CardModule, LibraryAdminGameSystemFormComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-game-system-creation.container.html'
})
export class LibraryAdminGameSystemCreateContainer extends CreateComponent<GameSystem> {

  private readonly service = inject(GameSystemAdminService);

  private readonly router = inject(Router);

  private readonly route = inject(ActivatedRoute);

  protected override save(toSave: GameSystem): Observable<GameSystem> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: GameSystem) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
