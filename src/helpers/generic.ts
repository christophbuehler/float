import {
  ArrowStrategy,
  Config,
  Float,
  PositionStrategy,
  Transition,
} from '../main';
import { V2 } from '../v2';

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

  const arrowStrategy: ArrowStrategy = () => ({
    x: 16,
    y: 0,
    size: 8,
  });

  const positionStrategy: PositionStrategy = ({ attachToPos, attachToDim }) =>
    attachToPos.add(attachToDim).add(new V2(-22, 8));

  const transition: Transition = () => 'bounce-top';

  return float({
    attachTo,
    template,
    hasBackdrop: true,
    closeOnBackdropClick: true,
    backdropColor: '#fff',
    transition,
    arrowStrategy,
    positionStrategy,
    ...partialConfig,
  });
};
