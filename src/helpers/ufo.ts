import {
  ArrowStrategy,
  Config,
  Float,
  PositionStrategy,
  Transition,
} from '../main';
import { V2 } from '../v2';
import { rightStart } from './arrow-strategies';
import { ninja } from './position-strategies';

declare const float: Float;

export default (
  attachTo: HTMLElement,
  contentOrTemplate: string | HTMLElement,
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

  const arrowStrategy = rightStart(8, 16, {
    customCss: `
        :host {
            background: #8f72e1;
        }
      `,
  });
  const positionStrategy = ninja('TOP_LEFT', new V2(-16, 0), true, false);

  const transition: Transition = () => 'bounce-left';

  Object.assign(template.style, {
    padding: '16px',
    color: '#fff',
    background: '#8f72e1',
  });

  const customCss = `

  `;

  return float({
    attachTo,
    template,
    hasBackdrop: true,
    closeOnBackdropClick: true,
    backdropColor: 'transparent',
    transition,
    arrowStrategy,
    positionStrategy,
    customCss,
    ...partialConfig,
  });
};
