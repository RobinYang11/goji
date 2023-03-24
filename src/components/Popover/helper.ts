import { POSITION_LIST } from './constants';
import { Position } from './types';

/**
 * 获取屏幕高度，排除滚动条
 * @returns
 */
export function getWindowSize() {
  const el = document.createElement('div');
  el.style.position = 'fixed';
  el.style.top = '0px';
  el.style.bottom = '0px';
  el.style.left = '0px';
  el.style.right = '0px';
  el.style.pointerEvents = 'none';
  el.style.opacity = '0';
  document.body.appendChild(el);
  const rect = el.getBoundingClientRect();
  document.body.removeChild(el);
  return {
    width: rect.width,
    height: rect.height
  };
}

/**
 * 根据方向获取rect位置
 * @param position
 * @param anchorElRect
 * @param computeElRect
 * @param offsetX
 * @param offsetY
 * @returns
 */
export const getPositionRect = (
  position: Position | 'fail',
  anchorElRect: DOMRect,
  computeElRect: DOMRect,
  offsetX: number,
  offsetY: number
) => {
  switch (position) {
    case 'bottomLeft':
      return {
        left: anchorElRect.left,
        top: anchorElRect.top + anchorElRect.height + offsetY
      };
    case 'bottom':
      return {
        left: anchorElRect.left + anchorElRect.width / 2 - computeElRect.width / 2,
        top: anchorElRect.top + anchorElRect.height + offsetY
      };
    case 'bottomRight':
      return {
        left: anchorElRect.left + anchorElRect.width - computeElRect.width,
        top: anchorElRect.top + anchorElRect.height + offsetY
      };

    case 'topLeft':
      return {
        left: anchorElRect.left,
        top: anchorElRect.top - computeElRect.height - offsetY
      };
    case 'top':
      return {
        left: anchorElRect.left + anchorElRect.width / 2 - computeElRect.width / 2,
        top: anchorElRect.top - computeElRect.height - offsetY
      };
    case 'topRight':
      return {
        left: anchorElRect.left + anchorElRect.width - computeElRect.width,
        top: anchorElRect.top - computeElRect.height - offsetY
      };

    case 'leftTop':
      return { left: anchorElRect.left - computeElRect.width - offsetX, top: anchorElRect.top };
    case 'left':
      return {
        left: anchorElRect.left - computeElRect.width - offsetX,
        top: anchorElRect.top + anchorElRect.height / 2 - computeElRect.height / 2
      };
    case 'leftBottom':
      return {
        left: anchorElRect.left - computeElRect.width - offsetX,
        top: anchorElRect.top + anchorElRect.height - computeElRect.height
      };

    case 'rightTop':
      return { left: anchorElRect.left + anchorElRect.width + offsetX, top: anchorElRect.top };
    case 'right':
      return {
        left: anchorElRect.left + anchorElRect.width + offsetX,
        top: anchorElRect.top + anchorElRect.height / 2 - computeElRect.height / 2
      };
    case 'rightBottom':
      return {
        left: anchorElRect.left + anchorElRect.width + offsetX,
        top: anchorElRect.top + anchorElRect.height - computeElRect.height
      };

    default:
      return {
        left: anchorElRect.left,
        top: anchorElRect.top + anchorElRect.height + offsetY
      };
  }
};

/**
 * 遍历所有方向，获取最佳方向
 */
export const findPositionRect = (
  position: Position,
  anchorElRect: DOMRect,
  computeElRect: DOMRect,
  offsetX: number,
  offsetY: number,
  /**
   * 自定义权重
   */
  customPosition: Position[] = []
): {
  pos: Position | 'fail';
  positionRect?: ReturnType<typeof getPositionRect>;
} => {
  const winSize = getWindowSize();

  // 默认用POSITION_LIST权重
  if (customPosition.length === 0) {
    customPosition = [...POSITION_LIST];
  }

  for (let i = 0; i < customPosition.length; i++) {
    if (customPosition[i] === position) {
      customPosition.splice(i, 1);
      customPosition.unshift(position);
      break;
    }
  }

  for (let index = 0; index < customPosition.length; index++) {
    const pos = customPosition[index];
    const positionRect = getPositionRect(pos, anchorElRect, computeElRect, offsetX, offsetY);
    if (
      positionRect.top >= 0 &&
      positionRect.top + computeElRect.height < winSize.height &&
      positionRect.left > 0 &&
      positionRect.left + computeElRect.width < winSize.width
    ) {
      return { positionRect, pos };
    }
  }
  return { pos: 'fail' };
};
