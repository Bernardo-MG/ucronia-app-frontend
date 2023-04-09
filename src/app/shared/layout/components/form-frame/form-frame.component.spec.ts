import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { DataFormComponent } from './form-frame.component';

describe('DataFormComponent', () => {
  let component: DataFormComponent;
  let fixture: ComponentFixture<DataFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconsModule
      ],
      declarations: [
        DataFormComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DataFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
