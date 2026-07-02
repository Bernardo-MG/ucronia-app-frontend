import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { ScheduledGame } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { ScheduledGameService } from '../scheduled-game-service';
import { ScheduledGameView } from './scheduled-game-view';

describe('ScheduledGameView', () => {
  let component: ScheduledGameView;
  let fixture: ComponentFixture<ScheduledGameView>;

  const scheduledGameServiceMock = jasmine.createSpyObj<ScheduledGameService>(
    'ScheduledGameService',
    ['create', 'update', 'delete', 'getAll', 'getOne']
  );

  beforeEach(async () => {

    scheduledGameServiceMock.getAll.and.returnValue(
      of(new Page<ScheduledGame>())
    );

    await TestBed.configureTestingModule({
      imports: [ScheduledGameView],
      providers: [
        provideAnimationsAsync(),
        ConfirmationService,
        { provide: ScheduledGameService, useValue: scheduledGameServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScheduledGameView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
