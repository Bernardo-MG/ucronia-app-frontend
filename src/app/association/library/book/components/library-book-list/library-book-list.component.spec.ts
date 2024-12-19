import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { SortDirection } from '@app/core/api/models/sort-direction';
import { Book } from '@app/models/library/book';
import { LibraryBookListComponent } from './library-book-list.component';

describe('LibraryBookListComponent', () => {
  let component: LibraryBookListComponent;
  let fixture: ComponentFixture<LibraryBookListComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LibraryBookListComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryBookListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  const books: Book[] = [
    {
      number: 0,
      title: { supertitle: 'Supertitle A', title: 'Title A', subtitle: 'Subtitle A', fullTitle: '' },
      lent: false,
      isbn: '',
      language: '',
      publishDate: '',
      authors: [],
      lendings: [],
      publishers: [],
      donation: undefined,
      bookType: undefined,
      gameSystem: undefined
    },
    {
      number: 0,
      title: { supertitle: 'Supertitle B', title: 'Title B', subtitle: 'Subtitle B', fullTitle: '' },
      lent: true,
      isbn: '',
      language: '',
      publishDate: '',
      authors: [],
      lendings: [],
      publishers: [],
      donation: undefined,
      bookType: undefined,
      gameSystem: undefined
    }
  ];

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render rows based on books input', () => {
    component.books = books;
    fixture.detectChanges();

    const rows = debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(books.length);
  });

  it('should display correct book data in rows', () => {
    component.books = books;
    fixture.detectChanges();

    const rows = debugElement.queryAll(By.css('tbody tr'));
    rows.forEach((row, index) => {
      const cells = row.queryAll(By.css('td'));
      expect(cells[0].nativeElement.textContent).toContain(books[index].title.supertitle);
      expect(cells[0].nativeElement.textContent).toContain(books[index].title.title);
      expect(cells[0].nativeElement.textContent).toContain(books[index].title.subtitle);
    });
  });

  it('should emit directionChange event when sorting button is clicked', () => {
    const spy = spyOn(component.directionChange, 'emit');
    fixture.detectChanges();

    const sortingButtons = debugElement.queryAll(By.css('sorting-button'));
    const firstSort = { property: 'title', direction: SortDirection.Ascending };
    sortingButtons[0].triggerEventHandler('directionChange', firstSort);
    const secondSort = { property: 'lent', direction: SortDirection.Descending };
    sortingButtons[1].triggerEventHandler('directionChange', secondSort);

    expect(spy).toHaveBeenCalledTimes(2);
    expect(spy.calls.allArgs()).toEqual([[firstSort], [secondSort]]);
  });

  it('should handle an empty books array gracefully', () => {
    component.books = [];
    fixture.detectChanges();

    const rows = debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(0);
  });

});
