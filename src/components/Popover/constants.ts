import { MotionProps } from 'framer-motion';
import { Position } from './types';

export const DEFAULT_MOTION_ANIMATE: MotionProps = {
  layout: true,
  animate: {
    opacity: 1,
    x: 0,
    y: 0
  },
  transition: { duration: 0.25, type: 'tween' }
};

export const DEFAULT_ANIMATE_POSITION: Partial<Record<Position, MotionProps>> = {
  bottom: {
    initial: { y: 40, x: 0, opacity: 1 },
    exit: { y: 40, x: 0, opacity: 0 }
  },
  bottomLeft: { initial: { y: 40, x: 0, opacity: 1 }, exit: { y: 40, x: 0, opacity: 0 } },
  bottomRight: { initial: { y: 40, x: 0, opacity: 1 }, exit: { y: 40, x: 0, opacity: 0 } },
  top: { initial: { y: -40, x: 0, opacity: 1 }, exit: { y: -40, x: 0, opacity: 0 } },
  topLeft: { initial: { y: -40, x: 0, opacity: 1 }, exit: { y: -40, x: 0, opacity: 0 } },
  topRight: { initial: { y: -40, x: 0, opacity: 1 }, exit: { y: -40, x: 0, opacity: 0 } },
  left: { initial: { y: 0, x: -40, opacity: 1 }, exit: { y: 0, x: -40, opacity: 0 } },
  leftTop: { initial: { y: 0, x: -40, opacity: 1 }, exit: { y: 0, x: -40, opacity: 0 } },
  leftBottom: { initial: { y: 0, x: -40, opacity: 1 }, exit: { y: 0, x: -40, opacity: 0 } },
  right: { initial: { y: 0, x: 40, opacity: 1 }, exit: { y: 0, x: 40, opacity: 0 } },
  rightBottom: { initial: { y: 0, x: 40, opacity: 1 }, exit: { y: 0, x: 40, opacity: 0 } },
  rightTop: { initial: { y: 0, x: 40, opacity: 1 }, exit: { y: 0, x: 40, opacity: 0 } }
};

/**
 * 查找方位的顺序(权重)
 */
export const POSITION_LIST: Position[] = [
  'bottom',
  'top',
  'left',
  'right',
  'bottomLeft',
  'bottomRight',
  'topLeft',
  'topRight',
  'leftTop',
  'leftBottom',
  'rightTop',
  'rightBottom'
];
