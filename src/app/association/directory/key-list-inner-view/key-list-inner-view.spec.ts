import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { Page } from '@bernardo-mg/request';
import { Key } from '@ucronia/domain';
import { ConfirmationService } from 'primeng/api';
import { of } from 'rxjs';
import { KeyService } from '../key-service';
import { KeyListInnerView } from './key-list-inner-view';

describe('KeyListInnerView', () => {
  let component: KeyListInnerView;
  let fixture: ComponentFixture<KeyListInnerView>;
  let keyService: jasmine.SpyObj<KeyService>;

  beforeEach(async () => {
    keyService = jasmine.createSpyObj<KeyService>('KeyService', ['getAll', 'create', 'update', 'delete']);
    const page = new Page<Key>();
    page.content = [new Key()];
    page.content[0].number = 22;
    keyService.getAll.and.returnValue(
      of(page)
    );

    await TestBed.configureTestingModule({
      imports: [KeyListInnerView],
      providers: [
        ConfirmationService,
        provideAnimationsAsync(),
        { provide: KeyService, useValue: keyService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(KeyListInnerView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the key list on init', () => {
    expect(keyService.getAll).toHaveBeenCalled();
    expect(component.keys.content.length).toBe(1);
    expect(component.keys.content[0].number).toBe(22);
  });
});
