import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookTypeCreateComponent } from './library-book-type-create.component';

describe('LibraryBookTypeCreateComponent', () => {
  let component: LibraryBookTypeCreateComponent;
  let fixture: ComponentFixture<LibraryBookTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookTypeCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
