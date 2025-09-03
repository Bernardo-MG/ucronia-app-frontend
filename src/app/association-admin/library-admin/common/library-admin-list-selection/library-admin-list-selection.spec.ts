import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LibraryAdminListSelection } from './library-admin-list-selection';

describe('LibraryAdminAuthorSelection', () => {
  let component: LibraryAdminListSelection;
  let fixture: ComponentFixture<LibraryAdminListSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminListSelection]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminListSelection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
