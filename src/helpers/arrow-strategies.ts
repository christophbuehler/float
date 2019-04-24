import { ArrowStrategy } from '../main';

export const topStart = (
  size = 8,
  offset = 16,
  more?: Partial<ArrowStrategy>,
): ArrowStrategy => () => ({
  size,
  x: offset,
  y: 0,
  ...more,
});

export const topEnd = (
  size = 8,
  offset = 16,
  more?: Partial<ArrowStrategy>,
): ArrowStrategy => () => ({
  size,
  x: offset,
  y: 0,
  fromRight: true,
  ...more,
});

export const leftStart = (
  size = 8,
  offset = 16,
  more?: Partial<ArrowStrategy>,
): ArrowStrategy => () => ({
  size,
  x: 0,
  y: offset,
  ...more,
});

export const leftEnd = (
  size = 8,
  offset = 16,
  more?: Partial<ArrowStrategy>,
): ArrowStrategy => () => ({
  size,
  x: 0,
  y: offset,
  fromBottom: true,
  ...more,
});

export const rightStart = (
  size = 8,
  offset = 16,
  more?: Partial<ArrowStrategy>,
): ArrowStrategy => () => ({
  size,
  x: 0,
  y: offset,
  fromRight: true,
  ...more,
});

export const rightEnd = (
  size = 8,
  offset = 16,
  more?: Partial<ArrowStrategy>,
): ArrowStrategy => () => ({
  size,
  x: 0,
  y: offset,
  fromRight: true,
  fromBottom: true,
  ...more,
});

export const bottomStart = (
  size = 8,
  offset = 16,
  more?: Partial<ArrowStrategy>,
): ArrowStrategy => () => ({
  size,
  x: offset,
  y: 0,
  fromBottom: true,
  ...more,
});

export const bottomEnd = (
  size = 8,
  offset = 16,
  more?: Partial<ArrowStrategy>,
): ArrowStrategy => () => ({
  size,
  x: offset,
  y: 0,
  fromRight: true,
  fromBottom: true,
  ...more,
});
