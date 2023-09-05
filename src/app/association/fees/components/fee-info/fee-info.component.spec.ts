import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { FeeInfoComponent } from './fee-info.component';

describe('FeeInfoComponent', () => {
  let component: FeeInfoComponent;
  let fixture: ComponentFixture<FeeInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        IconsModule
      ],
      declarations: [
         FeeInfoComponent 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
