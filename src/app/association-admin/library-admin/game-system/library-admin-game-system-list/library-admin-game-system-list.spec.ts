import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { GameSystemCrudService } from '../game-system-crud-service/game-system-crud-service';
import { LibraryAdminGameSystemList } from './library-admin-game-system-list';

describe('LibraryAdminGameSystemList', () => {
  let component: LibraryAdminGameSystemList;
  let fixture: ComponentFixture<LibraryAdminGameSystemList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminGameSystemList
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

    fixture = TestBed.createComponent(LibraryAdminGameSystemList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
