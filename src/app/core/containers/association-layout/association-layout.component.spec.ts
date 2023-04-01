import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from '@app/core/components/navbar/navbar.component';
import { CoreModule } from '@app/core/core.module';
import { AssociationLayoutComponent } from './association-layout.component';

describe('AssociationLayoutComponent', () => {
  let component: AssociationLayoutComponent;
  let fixture: ComponentFixture<AssociationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CoreModule,
        RouterTestingModule
      ],
      declarations: [
        AssociationLayoutComponent,
        NavbarComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AssociationLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
