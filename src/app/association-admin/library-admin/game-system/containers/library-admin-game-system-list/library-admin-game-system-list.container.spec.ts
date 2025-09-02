import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { GameSystemCrudService } from '../../services/game-system-crud-service';
import { LibraryAdminGameSystemListContainer } from './library-admin-game-system-list.container';

describe('LibraryAdminGameSystemListContainer', () => {
  let component: LibraryAdminGameSystemListContainer;
  let fixture: ComponentFixture<LibraryAdminGameSystemListContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminGameSystemListContainer
      ],
      providers: [
        GameSystemCrudService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameSystemListContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
