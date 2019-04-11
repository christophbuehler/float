import { ArrowStrategy } from '../main';

export const topStart = (size = 8, offset = 16): ArrowStrategy => () => ({
  size,
  x: offset,
  y: 0,
});

export const topEnd = (size = 8, offset = 16): ArrowStrategy => () => ({
  size,
  x: offset,
  y: 0,
  fromRight: true,
});

export const leftStart = (size = 8, offset = 16): ArrowStrategy => () => ({
  size,
  x: 0,
  y: offset,
});

export const leftEnd = (size = 8, offset = 16): ArrowStrategy => () => ({
  size,
  x: 0,
  y: offset,
  fromBottom: true,
});

export const rightStart = (size = 8, offset = 16): ArrowStrategy => () => ({
  size,
  x: 0,
  y: offset,
  fromRight: true,
});

export const rightEnd = (size = 8, offset = 16): ArrowStrategy => () => ({
  size,
  x: 0,
  y: offset,
  fromRight: true,
  fromBottom: true,
});

export const bottomStart = (size = 8, offset = 16): ArrowStrategy => () => ({
  size,
  x: offset,
  y: 0,
  fromBottom: true,
});

export const bottomEnd = (size = 8, offset = 16): ArrowStrategy => () => ({
  size,
  x: offset,
  y: 0,
  fromRight: true,
  fromBottom: true,
});
