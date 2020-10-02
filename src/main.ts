import { FloaterArrowComponent } from './floater-arrow';
import { FloaterBackdropComponent } from './floater-backdrop';
import { FloaterBoxComponent } from './floater-box';
import { V2 } from './v2';

customElementsDefine('floater-box', FloaterBoxComponent);
customElementsDefine('floater-arrow', FloaterArrowComponent);
customElementsDefine('floater-backdrop', FloaterBackdropComponent);

class Floater {
  private boxComponent: FloaterBoxComponent;
  private backdropComponent: FloaterBackdropComponent;

  constructor(public config: Config) {
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

  remove() {
    this.boxComponent.remove();
    if (this.backdropComponent) {
      this.backdropComponent.remove();
    }
  }

  show() {
    this.boxComponent.show();
    if (this.config.onShow) {
      this.config.onShow();
    }
  }

  hide() {
    this.boxComponent.hide();
    if (this.config.onHide) {
      this.config.onHide();
    }
  }

  reposition() {
    this.boxComponent.reposition();
  }
}

export default (config: Config) => new Floater(config);

export type Float = (config: Partial<Config>) => Floater;

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
  customCss?: string;
  onClick?: (ev: MouseEvent) => void;
  onHide?: () => void;
  onShow?: () => void;
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
  customCss?: string;
};

export type Transition = () => string;

// Define custom element if not already defined.
function customElementsDefine(
  name: string,
  constructor: CustomElementConstructor,
  options?: ElementDefinitionOptions,
): void {
  if (!window.customElements.get(name)) {
    window.customElements.define(name, constructor, options);
  }
}
