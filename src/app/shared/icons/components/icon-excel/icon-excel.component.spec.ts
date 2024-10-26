import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconExcelComponent } from './icon-excel.component';

describe('IconExcelComponent', () => {
  let component: IconExcelComponent;
  let fixture: ComponentFixture<IconExcelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [
        IconExcelComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
