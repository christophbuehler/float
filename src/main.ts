import { FloaterArrowComponent } from './floater-arrow';
import { FloaterBackdropComponent } from './floater-backdrop';
import { FloaterBoxComponent } from './floater-box';
import { V2 } from './v2';

window.customElements.define('floater-box', FloaterBoxComponent);
window.customElements.define('floater-arrow', FloaterArrowComponent);
window.customElements.define('floater-backdrop', FloaterBackdropComponent);

class Floater {
  private boxComponent: any;
  private backdropComponent: FloaterBackdropComponent;

  constructor(config: Config) {
    this.boxComponent = document.createElement('floater-box');
    this.boxComponent.config = config;
    const parent = config.parent || document.body;

    if (config.hasBackdrop) {
      this.backdropComponent = document.createElement(
        'floater-backdrop',
      ) as FloaterBackdropComponent;
      if (config.backdropColor) {
        this.backdropComponent.bgColor = config.backdropColor;
      }
      parent.appendChild(this.backdropComponent);
      this.boxComponent.backdropComponent = this.backdropComponent;
    }

    parent.appendChild(this.boxComponent);
  }

  public show() {
    this.boxComponent.show();
  }
}

export default (config: Config) => new Floater(config);

export interface Config {
  positionStrategy: PositionStrategy;
  hasBackdrop: boolean;
  closeOnBackdropClick: boolean;
  backdropColor: string;
  parent: HTMLElement;
  template: HTMLElement;
  attachTo: HTMLElement;
  arrowStrategy: ArrowStrategy;
  transition: () => string;
}

export type PositionStrategy = (
  state: {
    attachToPos: V2;
    attachToDim: V2;
    contentDim: V2;
  },
) => { x: number; y: number };
export type ArrowStrategy = () => { x: number; y: number; size: number };
