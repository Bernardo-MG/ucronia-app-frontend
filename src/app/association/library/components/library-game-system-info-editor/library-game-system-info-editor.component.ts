import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { EditionWrapperComponent } from '@app/shared/layout/components/edition-wrapper/edition-wrapper.component';
import { Observable } from 'rxjs';
import { BookType } from '../../models/book-type';
import { GameSystem } from '../../models/game-system';
import { GameSystemService } from '../../services/game-system.service';
import { LibraryGameSystemFormComponent } from '../library-game-system-form/library-game-system-form.component';
import { LibraryGameSystemInfoComponent } from '../library-game-system-info/library-game-system-info.component';

@Component({
  selector: 'assoc-library-game-system-info-editor',
  standalone: true,
  imports: [LibraryGameSystemFormComponent, LibraryGameSystemInfoComponent, ArticleComponent, EditionWrapperComponent],
  templateUrl: './library-game-system-info-editor.component.html'
})
export class LibraryGameSystemInfoEditorComponent extends InfoEditorComponent<GameSystem> implements OnInit {

  private name = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: GameSystemService,
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
      this.router.navigate(['/library']);
    });
  }

  protected override read(): Observable<BookType> {
    return this.service.getOne(this.name);
  }

  protected override save(toSave: BookType): Observable<BookType> {
    return this.service.update(this.data.name, toSave);
  }

}
