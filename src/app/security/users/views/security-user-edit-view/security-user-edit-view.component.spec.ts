import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SecurityUserService } from '../../service/security-user.service';

import { SecurityUserEditViewComponent } from './security-user-edit-view.component';

describe('SecurityUserEditViewComponent', () => {
  let component: SecurityUserEditViewComponent;
  let fixture: ComponentFixture<SecurityUserEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        SecurityUserEditViewComponent
      ],
      providers: [
        SecurityUserService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SecurityUserEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
