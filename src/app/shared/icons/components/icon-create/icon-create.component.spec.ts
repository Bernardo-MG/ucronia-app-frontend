import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconCreateComponent } from './icon-create.component';

describe('IconCreateComponent', () => {
  let component: IconCreateComponent;
  let fixture: ComponentFixture<IconCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconCreateComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
