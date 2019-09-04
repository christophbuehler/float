export class FloaterBackdropComponent extends HTMLElement {
  visible = false;
  bgColor = '#fff';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity .2s ease;
        z-index: 2;
      }
      :host(.show) {
        opacity: .8;
        pointer-events: initial;
      }
    `;
    this.shadowRoot.appendChild(style);
  }

  show() {
    this.visible = true;
    this.classList.toggle('show', true);
  }

  hide() {
    this.visible = false;
    this.classList.toggle('show', false);
  }

  connectedCallback() {
    this.style.backgroundColor = this.bgColor;
  }
}
