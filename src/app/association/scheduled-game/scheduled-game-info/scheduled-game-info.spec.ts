import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduledGameInfo } from './scheduled-game-info';

describe('ScheduledGameInfo', () => {
  let component: ScheduledGameInfo;
  let fixture: ComponentFixture<ScheduledGameInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledGameInfo]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScheduledGameInfo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
