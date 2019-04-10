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
  content: string,
  partialConfig: Partial<Config> = {},
) => {
  const template = document.createElement('div');
  template.innerHTML = content;
  template.style.padding = '16px';

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
