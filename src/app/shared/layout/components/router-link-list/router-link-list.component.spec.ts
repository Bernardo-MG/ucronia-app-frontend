import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IconsModule } from '@app/shared/icons/icons.module';
import { PaginationModule } from '@app/shared/pagination/pagination.module';
import { RouterLinkListComponent } from './router-link-list.component';

describe('RouterLinkListComponent', () => {
  let component: RouterLinkListComponent;
  let fixture: ComponentFixture<RouterLinkListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        PaginationModule,
        IconsModule
      ],
      declarations: [
        RouterLinkListComponent
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RouterLinkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
