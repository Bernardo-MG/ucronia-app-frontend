import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiUiModule } from '@app/api-ui/api-ui.module';
import { LayoutModule } from '@app/layout/layout.module';
import { FeeTabsComponent } from '../../components/fee-tabs/fee-tabs.component';
import { FeeService } from '../../services/fee.service';
import { FeeListViewComponent } from './fee-list-view.component';

describe('FeeListViewComponent', () => {
  let component: FeeListViewComponent;
  let fixture: ComponentFixture<FeeListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        LayoutModule,
        ApiUiModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        FeeListViewComponent,
        FeeTabsComponent
      ],
      providers: [
        FeeService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FeeListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
