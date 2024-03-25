import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { MemberInfoComponent } from './member-info.component';

describe('MemberInfoComponent', () => {
  let component: MemberInfoComponent;
  let fixture: ComponentFixture<MemberInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MemberInfoComponent,
        IconsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MemberInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
