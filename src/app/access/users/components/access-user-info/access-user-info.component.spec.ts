import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AccessUserInfoComponent } from './access-user-info.component';
import { IconsModule } from '@app/shared/icons/icons.module';

describe('AccessUserInfoComponent', () => {
  let component: AccessUserInfoComponent;
  let fixture: ComponentFixture<AccessUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IconsModule,
        AccessUserInfoComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AccessUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
