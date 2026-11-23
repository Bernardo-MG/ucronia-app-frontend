import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { GameSystem } from '@ucronia/domain';
import { ConfirmationService } from '@openng/optimus-ui/api';
import { of } from 'rxjs';
import { GameSystemService } from '../game-system-service';
import { LibraryGameSystemListView } from './library-game-system-list-view';

describe('LibraryGameSystemListView', () => {
  let component: LibraryGameSystemListView;
  let fixture: ComponentFixture<LibraryGameSystemListView>;

  const gameSystemCrudServiceMock = {
    getAll: vi.fn(
    ).mockName("GameSystemCrudService.getAll"),
    create: vi.fn().mockName("GameSystemCrudService.create"), update: vi.fn().mockName("GameSystemCrudService.update"), delete: vi.fn(
  ).mockName("GameSystemCrudService.delete")
};

  beforeEach(async () => {

    gameSystemCrudServiceMock.getAll.mockReturnValue(
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
