import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { GameSystem } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { GameSystemService } from '../game-system-service';
import { LibraryGameSystemListView } from './library-game-system-list-view';

describe('LibraryGameSystemListView', () => {
  let component: LibraryGameSystemListView;
  let fixture: ComponentFixture<LibraryGameSystemListView>;

  const gameSystemCrudServiceMock = jasmine.createSpyObj<GameSystemService>(
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
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: GameSystemService, useValue: gameSystemCrudServiceMock }
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
