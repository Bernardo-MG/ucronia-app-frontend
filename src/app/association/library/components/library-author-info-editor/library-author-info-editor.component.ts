import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { InfoEditorComponent } from '@app/shared/form/components/info-editor/info-editor.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Observable } from 'rxjs';
import { BookType } from '../../models/book-type';
import { GameSystem } from '../../models/game-system';
import { GameSystemService } from '../../services/game-system.service';
import { LibraryGameSystemFormComponent } from '../library-game-system-form/library-game-system-form.component';
import { LibraryGameSystemInfoComponent } from '../library-game-system-info/library-game-system-info.component';

@Component({
  selector: 'assoc-library-author-info-editor',
  standalone: true,
  imports: [LayoutModule, LibraryGameSystemFormComponent, LibraryGameSystemInfoComponent],
  templateUrl: './library-author-info-editor.component.html'
})
export class LibraryAuthorInfoEditorComponent extends InfoEditorComponent<GameSystem> implements OnInit {

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
    this.editable = this.authContainer.hasPermission("game_system", "update");
    this.deletable = this.authContainer.hasPermission("game_system", "delete");

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
