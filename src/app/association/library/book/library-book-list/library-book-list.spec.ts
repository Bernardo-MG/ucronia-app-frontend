import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookList } from './library-book-list';

describe('LibraryBookList', () => {
  let component: LibraryBookList;
  let fixture: ComponentFixture<LibraryBookList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryBookList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
