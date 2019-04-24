import { ArrowStrategy } from './main';

export class FloaterArrowComponent extends HTMLElement {
  public arrowStrategy: ArrowStrategy;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
        :host {
          display: block;
          position: absolute;
          transform: rotate(45deg);
          box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
          background-color: #fff;
          z-index: -1;
        }
      `;
    this.shadowRoot.appendChild(style);
  }

  public connectedCallback() {
    this.reposition();

    const customCss = this.arrowStrategy().customCss;
    if (customCss) {
      const style = document.createElement('style');
      style.textContent = customCss;
      this.shadowRoot.appendChild(style);
    }
  }

  public reposition() {
    const { x, y, size, fromRight, fromBottom } = this.arrowStrategy();
    const offset = size / 2;

    Object.assign(this.style, {
      [fromRight ? 'right' : 'left']: `${x - offset}px`,
      [fromBottom ? 'bottom' : 'top']: `${y - offset}px`,
      width: `${size}px`,
      height: `${size}px`,
    });
  }
}
