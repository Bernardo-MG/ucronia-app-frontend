import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameSystem } from '@app/models/library/game-system';
import { AuthContainer } from '@bernardo-mg/authentication';
import { InfoEditorStatusComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/ui';
import { Observable } from 'rxjs';
import { LibraryAdminGameSystemFormComponent } from '../../components/library-admin-game-system-form/library-admin-game-system-form.component';
import { LibraryAdminGameSystemInfoComponent } from '../../components/library-admin-game-system-info/library-admin-game-system-info.component';
import { GameSystemAdminService } from '../../services/game-system-admin.service';

@Component({
  selector: 'assoc-library-admin-game-system-edition',
  imports: [CommonModule, LibraryAdminGameSystemFormComponent, LibraryAdminGameSystemInfoComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-game-system-edition.container.html'
})
export class LibraryAdminGameSystemInfoEditorContainer extends InfoEditorStatusComponent<GameSystem> {

  private readonly route = inject(ActivatedRoute);

  private readonly router = inject(Router);

  private readonly service = inject(GameSystemAdminService);

  private number = -1;

  constructor(
    authContainer: AuthContainer
  ) {
    super(new GameSystem());
    // Check permissions
    this.editable = authContainer.hasPermission("library_game_system", "update");
    this.deletable = authContainer.hasPermission("library_game_system", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const numberParam = params.get('number');
      if (numberParam) {
        this.number = Number(numberParam);
      }
      this.load();
    });
  }

  protected override delete(): void {
    this.service.delete(this.data.number).subscribe(r => {
      this.router.navigate(['..'], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<GameSystem> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: GameSystem): Observable<GameSystem> {
    return this.service.update(this.data.number, toSave);
  }

}
