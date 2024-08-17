import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsModule } from '../../icons.module';
import { IconSuccessOrFailureComponent } from './icon-success-or-failure.component';

describe('IconSuccessOrFailureComponent', () => {
  let component: IconSuccessOrFailureComponent;
  let fixture: ComponentFixture<IconSuccessOrFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconsModule
      ],
      declarations: [
        IconSuccessOrFailureComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconSuccessOrFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
