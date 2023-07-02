import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutModule } from '@app/shared/layout/layout.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { ActiveMembersListComponent } from './active-members-list.component';

describe('ActiveMembersListComponent', () => {
  let component: ActiveMembersListComponent;
  let fixture: ComponentFixture<ActiveMembersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        LayoutModule,
        PaginationModule
      ],
      declarations: [ 
        ActiveMembersListComponent 
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveMembersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
