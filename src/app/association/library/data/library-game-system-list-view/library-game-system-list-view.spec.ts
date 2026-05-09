import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { GameSystem } from '@ucronia/domain';
import { ConfirmationService, MessageService } from 'primeng/api';
import { of } from 'rxjs';
import { GameSystemCrudService } from '../game-system-crud-service';
import { LibraryGameSystemListView } from './library-game-system-list-view';

describe('LibraryGameSystemListView', () => {
  let component: LibraryGameSystemListView;
  let fixture: ComponentFixture<LibraryGameSystemListView>;

  const gameSystemCrudServiceMock = jasmine.createSpyObj<GameSystemCrudService>(
    'GameSystemCrudService',
    ['getAll', 'create', 'update', 'delete']
  );

  beforeEach(async () => {

    gameSystemCrudServiceMock.getAll.and.returnValue(
      of(new Page<GameSystem>())
    );

    await TestBed.configureTestingModule({
      imports: [
        LibraryGameSystemListView
      ],
      providers: [
        MessageService,
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: GameSystemCrudService, useValue: gameSystemCrudServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LibraryGameSystemListView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
