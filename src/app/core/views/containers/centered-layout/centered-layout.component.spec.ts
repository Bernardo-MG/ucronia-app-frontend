import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CenteredLayoutComponent } from './centered-layout.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CenteredLayoutComponent', () => {
  let component: CenteredLayoutComponent;
  let fixture: ComponentFixture<CenteredLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        CenteredLayoutComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CenteredLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
