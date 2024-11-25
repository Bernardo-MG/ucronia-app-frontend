import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { LibraryBookListContainer } from '../library-book-list/library-book-list.container';

@Component({
  selector: 'assoc-library-frontpage',
  standalone: true,
  imports: [RouterModule, IconsModule, CardModule, LibraryBookListContainer, ArticleComponent],
  templateUrl: './library-frontpage.container.html'
})
export class LibraryFrontpageContainer {

  public adminPermission = false;

  constructor(
    private authContainer: AuthContainer
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.adminPermission = this.authContainer.hasPermission("library_admin", "view");
  }

}
