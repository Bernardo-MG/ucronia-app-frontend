import { Renderer2, ElementRef } from '@angular/core';
import { WaitingDirective } from './waiting.directive';

describe('WaitingDirective', () => {
  let directive: WaitingDirective;
  let element: HTMLElement;
  let renderer: Renderer2;

  beforeEach(() => {
    element = document.createElement('div');  // Use a generic element, not just button
    // We use a real-ish Renderer2 fallback — won't spy anymore
    renderer = {
      createElement: (name: string) => document.createElement(name),
      addClass: (el: any, className: string) => el.classList.add(className),
      appendChild: (parent: any, child: any) => parent.appendChild(child),
      removeChild: (parent: any, child: any) => parent.removeChild(child),
      setAttribute: (el: any, attr: string, value: string) => el.setAttribute(attr, value),
      removeAttribute: (el: any, attr: string) => el.removeAttribute(attr),
    } as Renderer2;

    directive = new WaitingDirective(new ElementRef(element), renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add spinner and hide content when layoutWaiting is true', () => {
    element.innerHTML = 'Some content';
    directive.layoutWaiting = true;

    directive.ngAfterViewInit();

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
    directive.ngAfterViewInit();

    // Change the state to false
    directive.layoutWaiting = false;
    directive.ngOnChanges();

    // Ensure the spinner is removed
    expect(element.querySelector('span.spinner-border')).toBeNull();
    // Ensure the original content is restored
    expect(element.textContent?.trim()).toBe('Some content');
    // Ensure aria-busy attribute is removed
    expect(element.hasAttribute('aria-busy')).toBeFalse();
  });

  it('should work with any HTML element, not just button', () => {
    // Test with a generic element
    element = document.createElement('div');
    directive = new WaitingDirective(new ElementRef(element), renderer);

    element.innerHTML = 'Test content';
    directive.layoutWaiting = true;

    directive.ngAfterViewInit();

    // Check spinner is added
    expect(element.querySelector('span.spinner-border')).not.toBeNull();
    // Ensure original content is cleared
    expect(element.textContent?.trim()).toBe('');
    expect(element.getAttribute('aria-busy')).toBe('true');

    // Change state back
    directive.layoutWaiting = false;
    directive.ngOnChanges();

    // Check spinner is removed and original content is restored
    expect(element.querySelector('span.spinner-border')).toBeNull();
    expect(element.textContent?.trim()).toBe('Test content');
    expect(element.hasAttribute('aria-busy')).toBeFalse();
  });
});
