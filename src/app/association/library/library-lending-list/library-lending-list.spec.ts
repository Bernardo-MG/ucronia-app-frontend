import { ComponentFixture, TestBed } from '@angular/core/testing';

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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
