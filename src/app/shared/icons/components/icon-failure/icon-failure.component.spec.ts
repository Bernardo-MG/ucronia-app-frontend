import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconFailureComponent } from './icon-failure.component';

describe('IconFailureComponent', () => {
  let component: IconFailureComponent;
  let fixture: ComponentFixture<IconFailureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule
      ],
      declarations: [ 
        IconFailureComponent
       ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IconFailureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
