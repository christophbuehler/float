export class FloaterBackdropComponent extends HTMLElement {
  public visible = false;
  public bgColor = '#fff';

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        pointer-events: none;
        transition: opacity .2s ease;
      }
      :host(.show) {
        opacity: .8;
        pointer-events: initial;
      }
    `;
    this.shadowRoot.appendChild(style);
  }

  public show() {
    this.visible = true;
    this.classList.toggle('show', true);
  }

  public hide() {
    this.visible = false;
    this.classList.toggle('show', false);
  }

  public connectedCallback() {
    this.style.backgroundColor = this.bgColor;
  }
}
