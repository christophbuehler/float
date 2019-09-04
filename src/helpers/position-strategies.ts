import { PositionStrategy } from '../main';
import { V2 } from '../v2';

export type RefPoint =
  | 'TOP_LEFT'
  | 'TOP_RIGHT'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_RIGHT'
  | 'TOP_CENTER'
  | 'BOTTOM_CENTER'
  | 'CENTER_CENTER';

export const ninja = (
  pivot: RefPoint = 'BOTTOM_LEFT',
  offset: V2 = new V2(0, 0),
  flipX = false,
  flipY = false,
): PositionStrategy => {
  return ({ attachToDim, attachToPos, contentDim }) => {
    let pos = attachToPos;
    const windowDim = new V2(window.innerWidth, window.innerHeight);

    switch (pivot) {
      case 'TOP_RIGHT':
        pos = pos.add(new V2(attachToDim.x, 0));
        break;
      case 'BOTTOM_RIGHT':
        pos = pos.add(new V2(attachToDim.x, attachToDim.y));
        break;
      case 'BOTTOM_LEFT':
        pos = pos.add(new V2(0, attachToDim.y));
        break;
      case 'TOP_CENTER':
        pos = pos
          .dot(new V2(0, 1))
          .add(new V2((windowDim.x - contentDim.x) / 2, 0));
        break;
      case 'BOTTOM_CENTER':
        pos = pos
          .dot(new V2(0, 1))
          .add(new V2((windowDim.x - contentDim.x) / 2, attachToDim.y));
        break;
      case 'CENTER_CENTER':
        pos = windowDim.subtract(contentDim).dot(new V2(0.5, 0.5));
        break;
    }

    if (flipX) {
      pos = pos.add(new V2(-contentDim.x, 0));
    }

    if (flipY) {
      pos = pos.add(new V2(0, -contentDim.y));
    }

    pos = pos.add(offset);
    return pos;
  };
};
