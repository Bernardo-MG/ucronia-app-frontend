import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditionModule } from '@app/shared/edition/edition.module';
import { MemberInfoFormComponent } from './member-info-form.component';

describe('MemberInfoFormComponent', () => {
  let component: MemberInfoFormComponent;
  let fixture: ComponentFixture<MemberInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        EditionModule
      ],
      declarations: [ 
        MemberInfoFormComponent 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
