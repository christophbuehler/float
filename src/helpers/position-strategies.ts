import { PositionStrategy } from '../main';
import { V2 } from '../v2';

export type Corner = 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT';

export const ninja = (
  pivot: Corner = 'BOTTOM_LEFT',
  offset: V2 = new V2(0, 0),
  flipX = false,
  flipY = false,
): PositionStrategy => {
  return ({ attachToDim, attachToPos, contentDim }) => {
    let pos = attachToPos;

    if (pivot === 'TOP_RIGHT') {
      pos = pos.add(new V2(attachToDim.x, 0));
    }

    if (pivot === 'BOTTOM_RIGHT') {
      pos = pos.add(new V2(attachToDim.x, attachToDim.y));
    }

    if (pivot === 'BOTTOM_LEFT') {
      pos = pos.add(new V2(0, attachToDim.y));
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
