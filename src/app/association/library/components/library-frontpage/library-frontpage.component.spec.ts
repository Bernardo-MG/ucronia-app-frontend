import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryFrontpageComponent } from './library-frontpage.component';

describe('LibraryFrontpageComponent', () => {
  let component: LibraryFrontpageComponent;
  let fixture: ComponentFixture<LibraryFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryFrontpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
