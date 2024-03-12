import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookTypeCreateFormComponent } from './library-book-type-create-form.component';

describe('LibraryBookTypeCreateFormComponent', () => {
  let component: LibraryBookTypeCreateFormComponent;
  let fixture: ComponentFixture<LibraryBookTypeCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookTypeCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookTypeCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
