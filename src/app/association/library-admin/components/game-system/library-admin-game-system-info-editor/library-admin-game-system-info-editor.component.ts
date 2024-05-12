import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorStatusComponent } from '@app/shared/form/components/info-editor-status/info-editor-status.component';
import { FormModule } from '@app/shared/form/form.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { Observable } from 'rxjs';
import { BookType } from '../../../models/book-type';
import { GameSystem } from '../../../models/game-system';
import { GameSystemAdminService } from '../../../services/game-system-admin.service';
import { LibraryAdminGameSystemFormComponent } from '../library-admin-game-system-form/library-admin-game-system-form.component';
import { LibraryAdminGameSystemInfoComponent } from '../library-admin-game-system-info/library-admin-game-system-info.component';

@Component({
  selector: 'assoc-library-admin-game-system-info-editor',
  standalone: true,
  imports: [CommonModule, FormModule, LibraryAdminGameSystemFormComponent, LibraryAdminGameSystemInfoComponent, ArticleComponent],
  templateUrl: './library-admin-game-system-info-editor.component.html'
})
export class LibraryAdminGameSystemInfoEditorComponent extends InfoEditorStatusComponent<GameSystem> implements OnInit {

  private name = '';

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
    this.editable = false;
    this.deletable = this.authContainer.hasPermission("library_game_system", "delete");

    // Get id
    this.route.paramMap.subscribe(params => {
      const nameParam = params.get('name');
      if (nameParam) {
        this.name = nameParam;
      }
      this.load();
    });
  }

  protected override delete(): void {
    this.service.delete(this.data.name).subscribe(r => {
      this.router.navigate(['/library/admin']);
    });
  }

  protected override read(): Observable<GameSystem> {
    return this.service.getOne(this.name);
  }

  protected override save(toSave: GameSystem): Observable<GameSystem> {
    return this.service.update(this.data.name, toSave);
  }

}
