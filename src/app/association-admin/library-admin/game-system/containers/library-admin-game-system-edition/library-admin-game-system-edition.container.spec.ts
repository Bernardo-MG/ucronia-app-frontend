import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GameSystemAdminService } from '../../services/game-system-admin.service';
import { LibraryAdminGameSystemInfoEditorContainer } from './library-admin-game-system-edition.container';

describe('LibraryAdminGameSystemInfoEditorContainer', () => {
  let component: LibraryAdminGameSystemInfoEditorContainer;
  let fixture: ComponentFixture<LibraryAdminGameSystemInfoEditorContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryAdminGameSystemInfoEditorContainer
      ],
      providers: [
        GameSystemAdminService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryAdminGameSystemInfoEditorContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
