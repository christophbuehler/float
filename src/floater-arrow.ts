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
          box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16), 0 8px 16px rgba(27, 39, 51, 0.08);
          background-color: #fff;
          z-index: -1;
        }
      `;
    this.shadowRoot.appendChild(style);
  }

  public connectedCallback() {
    this.reposition();
  }

  private reposition() {
    const { x, y, size } = this.arrowStrategy();
    const offset = size / 2;

    Object.assign(this.style, {
      left: `${x - offset}px`,
      top: `${y - offset}px`,
      width: `${size}px`,
      height: `${size}px`,
    });
  }
}
