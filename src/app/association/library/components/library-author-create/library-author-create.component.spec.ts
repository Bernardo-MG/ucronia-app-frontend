import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAuthorCreateComponent } from './library-author-create.component';

describe('LibraryAuthorCreateComponent', () => {
  let component: LibraryAuthorCreateComponent;
  let fixture: ComponentFixture<LibraryAuthorCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAuthorCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAuthorCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});