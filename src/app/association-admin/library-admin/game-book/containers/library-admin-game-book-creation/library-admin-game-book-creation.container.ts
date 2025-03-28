import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Language } from '@app/models/library/language';
import { CreateComponent } from '@bernardo-mg/form';
import { CardBodyComponent, CardComponent, ResponsiveShortColumnsDirective } from '@bernardo-mg/layout';
import { Observable } from 'rxjs';
import { LibraryAdminBookCreationFormComponent } from '../../../shared/components/library-admin-book-creation-form/library-admin-book-creation-form.component';
import { GameBookAdminService } from '../../services/game-book-admin.service';
import { GameBook } from '@app/models/library/game-book';

@Component({
  selector: 'assoc-library-admin-game-book-creation',
  imports: [CommonModule, LibraryAdminBookCreationFormComponent, CardComponent, CardBodyComponent, ResponsiveShortColumnsDirective],
  templateUrl: './library-admin-game-book-creation.container.html'
})
export class LibraryAdminGameBookCreationContainer extends CreateComponent<GameBook> implements OnInit {

  private service = inject(GameBookAdminService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  public languages: Language[] = [];

  public ngOnInit(): void {
    this.languages = this.service.getLanguages();
  }

  protected override save(toSave: GameBook): Observable<GameBook> {
    return this.service.create(toSave);
  }

  protected override handleSaveSuccess(saved: GameBook) {
    super.handleSaveSuccess(saved);
    this.router.navigate(['..'], { relativeTo: this.route });
  }

}
