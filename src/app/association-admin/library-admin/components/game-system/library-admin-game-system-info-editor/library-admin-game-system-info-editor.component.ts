import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { GameSystem } from '@app/models/library/game-system';
import { CardModule } from '@app/shared/card/card.module';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { Observable } from 'rxjs';
import { GameSystemAdminService } from '../../../services/game-system-admin.service';
import { LibraryAdminGameSystemFormComponent } from '../library-admin-game-system-form/library-admin-game-system-form.component';
import { LibraryAdminGameSystemInfoComponent } from '../library-admin-game-system-info/library-admin-game-system-info.component';

@Component({
  selector: 'assoc-library-admin-game-system-info-editor',
  standalone: true,
  imports: [CommonModule, CardModule, LibraryAdminGameSystemFormComponent, ArticleComponent, LibraryAdminGameSystemInfoComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-game-system-info-editor.component.html'
})
export class LibraryAdminGameSystemInfoEditorComponent extends InfoEditorStatusComponent<GameSystem> implements OnInit {

  private number = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GameSystemAdminService,
    private authContainer: AuthContainer
  ) {
    super(new GameSystem());
  }

  public ngOnInit(): void {
    // Check permissions
    this.editable = this.authContainer.hasPermission("library_game_system", "update");
    this.deletable = this.authContainer.hasPermission("library_game_system", "delete");

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
      this.router.navigate(['../..'], { relativeTo: this.route });
    });
  }

  protected override read(): Observable<GameSystem> {
    return this.service.getOne(this.number);
  }

  protected override save(toSave: GameSystem): Observable<GameSystem> {
    return this.service.update(this.data.number, toSave);
  }

}
