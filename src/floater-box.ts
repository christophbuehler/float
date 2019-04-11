import { FloaterArrowComponent } from './floater-arrow';
import { FloaterBackdropComponent } from './floater-backdrop';
import { Config } from './main';
import { V2 } from './v2';

export class FloaterBoxComponent extends HTMLElement {
  public config: Config;
  public backdropComponent: FloaterBackdropComponent;
  private arrowComponent: FloaterArrowComponent;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      :host {
        position: absolute;
        box-shadow: 0 0 0 1px rgba(99, 114, 130, 0.16), 0 8px 16px rgba(27, 39, 51, 0.08);
        border-radius: 4px;
        background-color: #fff;
        opacity: 0;
        z-index: 2;
        pointer-events: none;
      }
      :host(.show) {
        transition: opacity .2s ease;
        opacity: 1;
        pointer-events: initial;
      }
      :host(.bounce-top) {
        transform: translate(0, -8px);
      }
      :host(.bounce-top.show) {
        transform: translate(0, 0);
        animation-name: bounce-from-top;
        animation-duration: .4s;
        animation-iteration-count: 1;
      }
      @keyframes bounce-from-top {
        0% {
          transform: translate(0, -8px);
        }
        30% {
          transform: translate(0, 2px);
        }
        60% {
          transform: translate(0, -1px);
        }
        100% {
          transform: translate(0, 0);
        }
      }
      :host(.bounce-left) {
        transform: translate(-8px, 0);
      }
      :host(.bounce-left.show) {
        transform: translate(0, 0);
        animation-name: bounce-from-left;
        animation-duration: .4s;
        animation-iteration-count: 1;
      }
      @keyframes bounce-from-left {
        0% {
          transform: translate(-8px, 0);
        }
        30% {
          transform: translate(2px, 0);
        }
        60% {
          transform: translate(-1px, 0);
        }
        100% {
          transform: translate(0, 0);
        }
      }
      :host(.bounce-right) {
        transform: translate(8px, 0);
      }
      :host(.bounce-right.show) {
        transform: translate(0, 0);
        animation-name: bounce-from-right;
        animation-duration: .4s;
        animation-iteration-count: 1;
      }
      @keyframes bounce-from-right {
        0% {
          transform: translate(8px, 0);
        }
        30% {
          transform: translate(-2px, 0);
        }
        60% {
          transform: translate(1px, 0);
        }
        100% {
          transform: translate(0, 0);
        }
      }
    `;

    this.shadowRoot.appendChild(style);
  }

  public show() {
    if (this.backdropComponent) {
      this.backdropComponent.show();
    }
    this.classList.toggle('show', true);
  }

  public hide() {
    if (this.backdropComponent) {
      this.backdropComponent.hide();
    }
    this.classList.toggle('show', false);
  }

  public connectedCallback() {
    this.config.template.style.backgroundColor = '#fff';
    this.config.template.style.position = 'relative';
    this.config.template.style.borderRadius = '4px';
    this.shadowRoot.appendChild(this.config.template);

    // Add backdrop.
    if (this.backdropComponent && this.config.closeOnBackdropClick) {
      this.backdropComponent.addEventListener('click', () => this.hide());
    }

    // Add arrow.
    if (this.config.arrowStrategy) {
      this.arrowComponent = document.createElement(
        'floater-arrow',
      ) as FloaterArrowComponent;
      this.arrowComponent.arrowStrategy = this.config.arrowStrategy;
      this.shadowRoot.appendChild(this.arrowComponent);
    }

    // Transition.
    if (this.config.transition) {
      this.classList.toggle(this.config.transition(), true);
    }

    this.reposition();
  }

  public reposition() {
    const { attachTo } = this.config;
    const offset = totalOffset(attachTo);
    const dim = new V2(attachTo.clientWidth, attachTo.clientHeight);

    this.positionWithAlignment(offset, dim);

    function totalOffset(el: HTMLElement, val: V2 = new V2(0, 0)): V2 {
      if (!el || el.tagName === 'BODY') {
        return val;
      }
      const newVal = new V2(val.x + el.offsetLeft, val.y + el.offsetTop);
      return totalOffset(el.offsetParent as HTMLElement, newVal);
    }
  }

  private positionWithAlignment(attachToPos: V2, attachToDim: V2) {
    const { x, y } = this.config.positionStrategy({
      attachToDim,
      attachToPos,
      contentDim: new V2(this.clientWidth, this.clientHeight),
    });

    Object.assign(this.style, {
      left: `${x}px`,
      top: `${y}px`,
    });
  }
}
