import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookTypeFormComponent } from './library-book-type-form.component';

describe('LibraryBookTypeFormComponent', () => {
  let component: LibraryBookTypeFormComponent;
  let fixture: ComponentFixture<LibraryBookTypeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookTypeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
