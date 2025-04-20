import { Renderer2, ElementRef } from '@angular/core';
import { WaitingDirective } from './waiting.directive';
import { TestBed } from '@angular/core/testing';

describe('WaitingDirective', () => {
  let directive: WaitingDirective;
  let element: HTMLElement;
  let renderer: jasmine.SpyObj<Renderer2>;

  beforeEach(() => {
    element = document.createElement('div');  // Use a generic element, not just button

    // Mock Renderer2 using jasmine.createSpyObj
    renderer = jasmine.createSpyObj('Renderer2', [
      'createElement',
      'addClass',
      'appendChild',
      'removeChild',
      'setAttribute',
      'removeAttribute'
    ]);

    // Setting up the mock methods behavior
    renderer.createElement.and.callFake((name: string) => document.createElement(name));
    renderer.addClass.and.callFake((el: HTMLElement, className: string) => el.classList.add(className));
    renderer.appendChild.and.callFake((parent: HTMLElement, child: HTMLElement) => parent.appendChild(child));
    renderer.removeChild.and.callFake((parent: HTMLElement, child: HTMLElement) => parent.removeChild(child));
    renderer.setAttribute.and.callFake((el: HTMLElement, attr: string, value: string) => el.setAttribute(attr, value));
    renderer.removeAttribute.and.callFake((el: HTMLElement, attr: string) => el.removeAttribute(attr));

    // Configure the TestBed to provide mocks via DI and declare the directive
    TestBed.configureTestingModule({
      providers: [
        WaitingDirective,
        { provide: ElementRef, useValue: element },
        { provide: Renderer2, useValue: renderer }
      ]
    });

    // Initialize the directive and inject the mocks via DI
    directive = TestBed.inject(WaitingDirective);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add spinner and hide content when layoutWaiting is true', () => {
    element.innerHTML = 'Some content';
    directive.layoutWaiting = true;

    // Trigger the setter to update the state
    directive.layoutWaiting = true;

    // Check that spinner was added
    expect(element.querySelector('span.spinner-border')).not.toBeNull();
    // Check that the content is cleared
    expect(element.textContent?.trim()).toBe('');
    // Check that aria-busy attribute was set
    expect(element.getAttribute('aria-busy')).toBe('true');
  });

  it('should restore original content when layoutWaiting becomes false', () => {
    element.innerHTML = 'Some content';
    directive.layoutWaiting = true;

    // Trigger the setter to show spinner
    directive.layoutWaiting = true;

    // Change the state to false
    directive.layoutWaiting = false;

    // Ensure the spinner is removed
    expect(element.querySelector('span.spinner-border')).toBeNull();
    // Ensure the original content is restored
    expect(element.textContent?.trim()).toBe('Some content');
    // Ensure aria-busy attribute is removed
    expect(element.hasAttribute('aria-busy')).toBeFalse();
  });

});
