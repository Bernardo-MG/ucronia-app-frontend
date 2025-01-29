import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconPersonComponent } from './icon-person.component';

describe('IconMembersComponent', () => {
  let component: IconPersonComponent;
  let fixture: ComponentFixture<IconPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconPersonComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
