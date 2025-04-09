import { Renderer2, ElementRef } from '@angular/core';
import { WaitingDirective } from './waiting.directive';

describe('WaitingDirective', () => {
  let directive: WaitingDirective;
  let button: HTMLButtonElement;
  let renderer: Renderer2;

  beforeEach(() => {
    button = document.createElement('button');
    // We use a real-ish Renderer2 fallback — won't spy anymore
    renderer = {
      createElement: (name: string) => document.createElement(name),
      addClass: (el: any, className: string) => el.classList.add(className),
      appendChild: (parent: any, child: any) => parent.appendChild(child),
      removeChild: (parent: any, child: any) => parent.removeChild(child),
      setAttribute: (el: any, attr: string, value: string) => el.setAttribute(attr, value),
      removeAttribute: (el: any, attr: string) => el.removeAttribute(attr),
    } as Renderer2;

    directive = new WaitingDirective(new ElementRef(button), renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should add spinner and hide content when layoutWaiting is true', () => {
    button.innerHTML = 'Text';
    directive.layoutWaiting = true;

    directive.ngAfterViewInit();

    expect(button.querySelector('span.spinner-border')).not.toBeNull();
    // Only spinner inside
    expect(button.textContent?.trim()).toBe('');
    expect(button.getAttribute('aria-busy')).toBe('true');
  });

  it('should restore original content when layoutWaiting becomes false', () => {
    button.innerHTML = 'Text';
    directive.layoutWaiting = true;
    directive.ngAfterViewInit();

    directive.layoutWaiting = false;
    directive.ngOnChanges();

    expect(button.querySelector('span.spinner-border')).toBeNull();
    expect(button.textContent?.trim()).toBe('Text');
    expect(button.hasAttribute('aria-busy')).toBeFalse();
  });
});
