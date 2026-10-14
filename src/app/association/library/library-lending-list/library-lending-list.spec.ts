import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookLending } from '@ucronia/domain';
import { LibraryLendingList } from './library-lending-list';

describe('LibraryLendingList', () => {
  let component: LibraryLendingList;
  let fixture: ComponentFixture<LibraryLendingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryLendingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryLendingList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('emits the selected lending when its show button is clicked', () => {
    const lending = new BookLending();
    lending.book.title.fullTitle = 'Test book';
    fixture.componentRef.setInput('lendings', [lending]);
    fixture.componentRef.setInput('rows', 10);
    fixture.componentRef.setInput('page', 1);
    fixture.componentRef.setInput('totalRecords', 1);
    fixture.detectChanges();
    const show = jasmine.createSpy('showLending');
    component.showLending.subscribe(show);
    fixture.nativeElement.querySelector('button[aria-label="Ver préstamo de Test book"]').click();
    expect(show).toHaveBeenCalledOnceWith(lending);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
