import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduledGameForm } from './scheduled-game-form';

describe('ScheduledGameForm', () => {
  let component: ScheduledGameForm;
  let fixture: ComponentFixture<ScheduledGameForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledGameForm]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ScheduledGameForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
