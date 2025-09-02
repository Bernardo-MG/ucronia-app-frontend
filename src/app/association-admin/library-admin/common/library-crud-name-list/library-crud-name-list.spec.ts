import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryCrudNameList } from './library-crud-name-list';

describe('LibraryCrudNameList', () => {
  let component: LibraryCrudNameList;
  let fixture: ComponentFixture<LibraryCrudNameList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryCrudNameList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibraryCrudNameList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
