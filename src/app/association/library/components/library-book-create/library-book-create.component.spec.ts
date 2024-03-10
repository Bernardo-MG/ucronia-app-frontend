import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryBookCreateComponent } from './library-book-create.component';

describe('LibraryBookCreateComponent', () => {
  let component: LibraryBookCreateComponent;
  let fixture: ComponentFixture<LibraryBookCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryBookCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryBookCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
