import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { GameSystemCrudService } from '../game-system-crud-service';
import { LibraryGameSystemList } from './library-game-system-list';

describe('LibraryGameSystemList', () => {
  let component: LibraryGameSystemList;
  let fixture: ComponentFixture<LibraryGameSystemList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LibraryGameSystemList
      ],
      providers: [
        GameSystemCrudService,
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryGameSystemList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
