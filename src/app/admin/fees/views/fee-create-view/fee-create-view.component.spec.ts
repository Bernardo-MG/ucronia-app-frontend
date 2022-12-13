import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FeeService } from '../../services/fee.service';

import { FeeCreateViewComponent } from './fee-create-view.component';

describe('FeeCreateViewComponent', () => {
  let component: FeeCreateViewComponent;
  let fixture: ComponentFixture<FeeCreateViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        FeeCreateViewComponent
      ],
      providers: [
        FeeService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeCreateViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
