import { Component } from '@angular/core';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { LibraryBookListComponent } from '../library-book-list/library-book-list.component';

@Component({
  selector: 'app-library-frontpage',
  standalone: true,
  imports: [ LayoutModule, LibraryBookListComponent ],
  templateUrl: './library-frontpage.component.html'
})
export class LibraryFrontpageComponent {

  public createPermission = false;

}
