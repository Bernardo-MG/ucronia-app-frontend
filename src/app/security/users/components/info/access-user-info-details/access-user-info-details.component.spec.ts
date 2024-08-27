import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessUserInfoDetailsComponent } from './access-user-info-details.component';

describe('AccessUserInfoComponent', () => {
  let component: AccessUserInfoDetailsComponent;
  let fixture: ComponentFixture<AccessUserInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccessUserInfoDetailsComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
