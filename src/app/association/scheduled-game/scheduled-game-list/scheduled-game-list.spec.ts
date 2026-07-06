import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduledGameList } from './scheduled-game-list';

describe('ScheduledGameList', () => {
  let component: ScheduledGameList;
  let fixture: ComponentFixture<ScheduledGameList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledGameList]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScheduledGameList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
