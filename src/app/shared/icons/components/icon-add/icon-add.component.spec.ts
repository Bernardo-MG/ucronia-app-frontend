import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconAddComponent } from './icon-add.component';

describe('IconAddComponent', () => {
  let component: IconAddComponent;
  let fixture: ComponentFixture<IconAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconAddComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
