import { DOMElementParametrs } from '../types/types';

export default class ElementCreator {
  public element: HTMLElement;
  constructor(public params: DOMElementParametrs) {
    this.element = this.createElement(params);
  }

  private createElement(params: DOMElementParametrs): HTMLElement {
    const element = document.createElement(params.tagName);
    params.classNames.forEach((className) => {
      element.classList.add(className);
    });
    if (params.textContent) element.textContent = params.textContent;
    return element;
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
