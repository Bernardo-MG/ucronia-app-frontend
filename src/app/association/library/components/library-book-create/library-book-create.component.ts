import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResponse } from '@app/core/api/models/paginated-response';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CreateComponent } from '@app/shared/form/components/create/create.component';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { Observable } from 'rxjs';
import { Book } from '../../models/book';
import { BookType } from '../../models/book-type';
import { GameSystem } from '../../models/game-system';
import { BookTypeService } from '../../services/book-type.service';
import { BookService } from '../../services/book.service';
import { GameSystemService } from '../../services/game-system.service';
import { LibraryBookFormComponent } from '../library-book-form/library-book-form.component';
import { LibraryBookTypeSelectionComponent } from '../library-book-type-selection/library-book-type-selection.component';
import { LibraryGameSystemSelectionComponent } from '../library-game-system-selection/library-game-system-selection.component';

@Component({
  selector: 'assoc-library-book-create',
  standalone: true,
  imports: [CommonModule, LayoutModule, LibraryBookFormComponent, LibraryGameSystemSelectionComponent, LibraryBookTypeSelectionComponent],
  templateUrl: './library-book-create.component.html'
})
export class LibraryBookCreateComponent extends CreateComponent<Book> implements OnInit {

  public createPermission = false;

  public selectBookType = false;

  public selectGameSystem = false;

  public readingBookTypes = false;

  public readingGameSystems = false;

  public bookTypePage = new PaginatedResponse<BookType[]>([]);

  public gameSystemPage = new PaginatedResponse<GameSystem[]>([]);

  public bookType = '';

  public gameSystem = '';

  constructor(
    private service: BookService,
    private bookTypeService: BookTypeService,
    private gameSystemService: GameSystemService,
    private authContainer: AuthContainer,
    rt: Router
  ) {
    super(rt);
  }

  public ngOnInit(): void {
    // Check permissions
    this.createPermission = this.authContainer.hasPermission("fee", "create");
    this.onGoToBookTypePage(0);
    this.onGoToGameSystemPage(0);
  }

  public onGoToBookTypePage(page: number) {
    this.readingBookTypes = true;
    // TODO: The page correction should be done automatically
    this.bookTypeService.getAll(page).subscribe({
      next: response => {
        this.bookTypePage = response;

        // Reactivate view
        this.readingBookTypes = false;
      },
      error: error => {
        // Reactivate view
        this.readingBookTypes = false;
      }
    });
  }

  public onGoToGameSystemPage(page: number) {
    this.readingGameSystems = true;
    // TODO: The page correction should be done automatically
    this.gameSystemService.getAll(page).subscribe({
      next: response => {
        this.gameSystemPage = response;

        // Reactivate view
        this.readingGameSystems = false;
      },
      error: error => {
        // Reactivate view
        this.readingGameSystems = false;
      }
    });
  }

  public onShowBookTypeSelection() {
    this.selectBookType = true;
  }

  public onShowGameSystemSelection() {
    this.selectGameSystem = true;
  }

  public onSelectBookType(bookType: BookType) {
    this.bookType = bookType.name;
    this.selectBookType = false;
  }

  public onSelectGameSystem(gameSystem: GameSystem) {
    this.gameSystem = gameSystem.name;
    this.selectGameSystem = false;
  }

  protected override save(toSave: Book): Observable<Book> {
    toSave.bookType = new BookType();
    toSave.bookType.name = this.bookType;
    toSave.gameSystem = new GameSystem();
    toSave.gameSystem.name = this.gameSystem;
    return this.service.create(toSave);
  }

  protected override getReturnRoute(saved: Book): string {
    return `/library/book/${saved.isbn}`;
  }

}
