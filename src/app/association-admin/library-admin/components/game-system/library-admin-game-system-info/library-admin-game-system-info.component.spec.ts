import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibraryAdminGameSystemInfoComponent } from './library-admin-game-system-info.component';

describe('LibraryAdminGameSystemInfoComponent', () => {
  let component: LibraryAdminGameSystemInfoComponent;
  let fixture: ComponentFixture<LibraryAdminGameSystemInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LibraryAdminGameSystemInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LibraryAdminGameSystemInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
