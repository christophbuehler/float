import {
  ArrowStrategy,
  Config,
  Float,
  PositionStrategy,
  Transition,
} from '../main';
import { V2 } from '../v2';
import {
  bottomStart,
  leftStart,
  rightStart,
  topStart,
} from './arrow-strategies';
import { ninja } from './position-strategies';

declare const float: Float;

export default (
  attachTo: HTMLElement,
  contentOrTemplate: string | HTMLElement,
  pos: 'LEFT' | 'TOP' | 'RIGHT' | 'BOTTOM' = 'BOTTOM',
  partialConfig: Partial<Config> = {},
) => {
  const template = (() => {
    if (typeof contentOrTemplate !== 'string') {
      return contentOrTemplate;
    }
    const tpl = document.createElement('div');
    tpl.innerHTML = contentOrTemplate;
    return tpl;
  })();

  Object.assign(template.style, {
    padding: '16px',
    color: '#fff',
    background: '#8f72e1',
    cursor: 'pointer',
  });

  const cfg: any = ({
    LEFT: left,
    TOP: top,
    RIGHT: right,
    BOTTOM: bottom,
  } as any)[pos]();

  const floater = float({
    attachTo,
    template,
    hasBackdrop: false,
    // closeOnBackdropClick: true,
    // backdropColor: 'transparent',
    ...cfg,
    ...partialConfig,
  });

  template.addEventListener('click', () => {
    floater.hide();
  });

  return floater;
};

function left(): Partial<Config> {
  const arrowStrategy = rightStart(8, 16, {
    customCss: `
        :host {
            background: #8f72e1;
        }
      `,
  });
  const positionStrategy = ninja('TOP_LEFT', new V2(-16, 0), true, false);
  const transition: Transition = () => 'bounce-left';
  return {
    arrowStrategy,
    positionStrategy,
    transition,
  };
}

function top(): Partial<Config> {
  const arrowStrategy = bottomStart(8, 16, {
    customCss: `
        :host {
            background: #8f72e1;
        }
      `,
  });
  const positionStrategy = ninja('TOP_LEFT', new V2(0, -16), false, true);
  const transition: Transition = () => 'bounce-top';
  return {
    arrowStrategy,
    positionStrategy,
    transition,
  };
}

function right(): Partial<Config> {
  const arrowStrategy = leftStart(8, 16, {
    customCss: `
        :host {
            background: #8f72e1;
        }
      `,
  });
  const positionStrategy = ninja('TOP_RIGHT', new V2(16, 0), false, false);
  const transition: Transition = () => 'bounce-right';
  return {
    arrowStrategy,
    positionStrategy,
    transition,
  };
}

function bottom(): Partial<Config> {
  const arrowStrategy = topStart(8, 16, {
    customCss: `
        :host {
            background: #8f72e1;
        }
      `,
  });
  const positionStrategy = ninja('BOTTOM_LEFT', new V2(0, 16), false, false);
  const transition: Transition = () => 'bounce-bottom';
  return {
    arrowStrategy,
    positionStrategy,
    transition,
  };
}
