import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentsModule } from '@app/components/components.module';
import { NavbarComponent } from '@app/layout/components/navbar/navbar.component';
import { AssociationLayoutComponent } from './association-layout.component';

describe('AssociationLayoutComponent', () => {
  let component: AssociationLayoutComponent;
  let fixture: ComponentFixture<AssociationLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
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
