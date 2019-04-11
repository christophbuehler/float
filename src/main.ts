import { FloaterArrowComponent } from './floater-arrow';
import { FloaterBackdropComponent } from './floater-backdrop';
import { FloaterBoxComponent } from './floater-box';
import { V2 } from './v2';

window.customElements.define('floater-box', FloaterBoxComponent);
window.customElements.define('floater-arrow', FloaterArrowComponent);
window.customElements.define('floater-backdrop', FloaterBackdropComponent);

class Floater {
  private boxComponent: FloaterBoxComponent;
  private backdropComponent: FloaterBackdropComponent;

  constructor(config: Config) {
    this.boxComponent = document.createElement(
      'floater-box',
    ) as FloaterBoxComponent;
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

  public remove() {
    this.boxComponent.remove();
    if (this.backdropComponent) {
      this.backdropComponent.remove();
    }
  }

  public show() {
    this.boxComponent.show();
  }

  public hide() {
    this.boxComponent.hide();
  }
}

export default (config: Config) => new Floater(config);

export type Float = (config: Config) => Floater;

export interface Config {
  positionStrategy: PositionStrategy;
  template: HTMLElement;
  attachTo: HTMLElement;
  parent?: HTMLElement;
  hasBackdrop?: boolean;
  closeOnBackdropClick?: boolean;
  backdropColor?: string;
  arrowStrategy?: ArrowStrategy;
  transition?: Transition;
}

export type PositionStrategy = (
  state: {
    attachToPos: V2;
    attachToDim: V2;
    contentDim: V2;
  },
) => {
  x: number;
  y: number;
};
export type ArrowStrategy = () => {
  x: number;
  y: number;
  size: number;
  fromRight?: boolean;
  fromBottom?: boolean;
};
export type Transition = () => string;
