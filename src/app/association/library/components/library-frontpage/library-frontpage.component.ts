import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { LibraryBookListComponent } from '../library-book-list/library-book-list.component';

@Component({
  selector: 'assoc-library-frontpage',
  standalone: true,
  imports: [RouterModule, IconsModule, LibraryBookListComponent, ArticleComponent],
  templateUrl: './library-frontpage.component.html'
})
export class LibraryFrontpageComponent {

  public adminPermission = false;

  constructor(
    private authContainer: AuthContainer
  ) { }

  ngOnInit(): void {
    // Check permissions
    this.adminPermission = this.authContainer.hasPermission("library_admin", "view");
  }

}
