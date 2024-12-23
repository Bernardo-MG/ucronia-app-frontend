import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminGameSystemSelectionComponent } from './library-admin-game-system-selection.component';

describe('LibraryAdminGameSystemSelectionComponent', () => {
  let component: LibraryAdminGameSystemSelectionComponent;
  let fixture: ComponentFixture<LibraryAdminGameSystemSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminGameSystemSelectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminGameSystemSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
