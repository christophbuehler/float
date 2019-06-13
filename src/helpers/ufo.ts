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
    padding: '12px',
    color: '#353d46',
    fontWeight: '600',
    background: '#fff',
    fontSize: '14px',
    cursor: 'pointer',
    borderRadius: '8px',
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
    customCss: `
      :host {
        box-shadow: 0 1px 3px rgba(60,64,67, 0.3), 0 4px 8px 3px rgba(60,64,67, 0.15);
        border-radius: 8px;
      }
    `,
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
          background: #fff;
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
            background: #fff;
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
            background: #fff;
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
            background: #fff;
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
