import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookAdminService } from '@app/association-admin/library-admin/services/book-admin.service';
import { Book } from '@app/models/library/book';
import { ArticleComponent } from '@app/shared/layout/components/article/article.component';
import { ResponsiveShortColumnsDirective } from '@app/shared/style/directives/responsive-columns.directive';
import { LibraryBookLendingComponent } from '../../shared/components/library-book-lending/library-book-lending.component';

@Component({
  selector: 'assoc-book-lending-lend',
  standalone: true,
  imports: [LibraryBookLendingComponent, ArticleComponent, ResponsiveShortColumnsDirective],
  templateUrl: './book-lending-lend.component.html'
})
export class BookLendingLendComponent implements OnInit {

  public data = new Book();

  private index = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: BookAdminService
  ) { }

  public ngOnInit(): void {
    // Get id
    this.route.paramMap.subscribe(params => {
      const indexParam = params.get('number');
      if (indexParam) {
        this.index = Number(indexParam);
      }
      this.load();
    });
  }

  public onSaved() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  private load() {
    this.service.getOne(this.index).subscribe({
      next: response => {
        this.data = response;
      },
      error: error => {
      }
    });
  }

}
