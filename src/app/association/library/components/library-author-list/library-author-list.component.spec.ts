import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAuthorListComponent } from './library-author-list.component';

describe('LibraryAuthorListComponent', () => {
  let component: LibraryAuthorListComponent;
  let fixture: ComponentFixture<LibraryAuthorListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAuthorListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAuthorListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
