import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookCreateFormComponent } from './library-book-create-form.component';

describe('LibraryBookCreateFormComponent', () => {
  let component: LibraryBookCreateFormComponent;
  let fixture: ComponentFixture<LibraryBookCreateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookCreateFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookCreateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
