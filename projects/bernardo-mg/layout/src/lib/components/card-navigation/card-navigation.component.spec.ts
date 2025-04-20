import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CardTab } from '../../models/card-tab';
import { CardNavigationComponent } from './card-navigation.component';

describe('CardNavigationComponent', () => {
  let component: CardNavigationComponent;
  let fixture: ComponentFixture<CardNavigationComponent>;

  const tabsMock: CardTab[] = [
    { code: 'tab1', name: 'Tab 1', disabled: false },
    { code: 'tab2', name: 'Tab 2', disabled: true },
    { code: 'tab3', name: 'Tab 3', disabled: false }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardNavigationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CardNavigationComponent);
    component = fixture.componentInstance;
    component.tabs = tabsMock;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all tabs', () => {
    const tabElements = fixture.debugElement.queryAll(By.css('.nav-item'));
    expect(tabElements.length).toBe(tabsMock.length);
    tabElements.forEach((el, index) => {
      expect(el.nativeElement.textContent).toContain(tabsMock[index].name);
    });
  });

  /** STATUS */

  it('should set the first tab as active when tabs are set', () => {
    expect(component.active).toBe('tab1');
  });

  it('should apply the active class only to the active tab', () => {
    const tabLinks = fixture.debugElement.queryAll(By.css('.nav-link'));
    expect(tabLinks[0].classes['active']).toBeTrue();
    expect(tabLinks[1].classes['active']).toBeUndefined();
  });

  it('should apply the disabled class and attribute for disabled tabs', () => {
    const disabledTab = fixture.debugElement.queryAll(By.css('.nav-link'))[1];
    expect(disabledTab.classes['disabled']).toBeTrue();
    expect(disabledTab.attributes['aria-disabled']).toBe('true');
  });

  /** OUTPUT */

  it('should emit pickTab and set active when a non-disabled tab is clicked', () => {
    spyOn(component.pickTab, 'emit');
    const secondTab = fixture.debugElement.queryAll(By.css('.nav-link'))[2]; // tab3
    secondTab.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.pickTab.emit).toHaveBeenCalledWith('tab3');
    expect(component.active).toBe('tab3');
  });

  it('should not emit pickTab or change active if a disabled tab is clicked', () => {
    spyOn(component.pickTab, 'emit');
    const disabledTab = fixture.debugElement.queryAll(By.css('.nav-link'))[1];
    disabledTab.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.pickTab.emit).not.toHaveBeenCalled();
    expect(component.active).not.toBe('tab2');
  });

});
