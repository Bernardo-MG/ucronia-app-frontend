import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryLendingFrontpageComponent } from './library-lending-frontpage.component';

describe('LibraryLendingFrontpageComponent', () => {
  let component: LibraryLendingFrontpageComponent;
  let fixture: ComponentFixture<LibraryLendingFrontpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryLendingFrontpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryLendingFrontpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
