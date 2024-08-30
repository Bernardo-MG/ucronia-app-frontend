import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthContainer } from '@app/core/authentication/services/auth.service';
import { CardModule } from '@app/shared/card/card.module';
import { IconsModule } from '@app/shared/icons/icons.module';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { LibraryBookListWidgetComponent } from '../../list/library-book-list-widget/library-book-list-widget.component';

@Component({
  selector: 'assoc-library-frontpage',
  standalone: true,
  imports: [RouterModule, IconsModule, CardModule, LibraryBookListWidgetComponent, ArticleComponent],
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
