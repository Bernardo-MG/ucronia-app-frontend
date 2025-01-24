import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GameSystemAdminService } from '../../services/game-system-admin.service';
import { LibraryAdminGameSystemCreateContainer } from './library-admin-game-system-creation.container';

describe('LibraryAdminGameSystemCreateContainer', () => {
  let component: LibraryAdminGameSystemCreateContainer;
  let fixture: ComponentFixture<LibraryAdminGameSystemCreateContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminGameSystemCreateContainer
      ],
      providers: [
        GameSystemAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameSystemCreateContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
