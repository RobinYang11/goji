import classNames from 'classnames';
import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import React, { CSSProperties, Fragment, MouseEvent, useCallback, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { isDevMode } from '../../libs/env';
import { DEFAULT_ANIMATE_POSITION, DEFAULT_MOTION_ANIMATE } from './constants';
import { findPositionRect, getPositionRect } from './helper';
import './index.less';
import { Position } from './types';

const classNameProvider = 'go-ji-popover-provider';

/**
 * 获取默认framer-motion配置
 * @param position
 * @returns
 */
const getDefaultMotionOption = (position: Position): MotionProps => {
  return Object.assign({ ...DEFAULT_MOTION_ANIMATE }, { ...DEFAULT_ANIMATE_POSITION[position] });
};

const Popover: React.FunctionComponent<{
  /**
   * 显示位置
   */
  placement: Position;
  /**
   * 显示内容
   */
  overlay: React.ReactNode;
  /**
   * 左右边距
   * @default 5
   */
  offsetX?: number;
  /**
   * 上下边距
   * @default 0
   */
  offsetY?: number;
  /**
   * 如果显示内容需要交互，设置为true
   * @default false
   */
  needHold?: boolean;
  className?: string;
  zIndex?: number;
  /**
   * 是否自动调整位置
   */
  autoAdjustOverflow?: boolean;
  /**
   * 动画自定义 (当autoAdjustOverflow打开时，支持多方向动画)
   */
  motionOption?: MotionProps;
  /**
   * 自定义调整方向权重（仅支持autoAdjustOverflow打开时）
   */
  customPosition?: Position[];
  children: React.ReactNode;
  getPopupContainer?: () => HTMLElement;
}> = ({
  children,
  placement,
  overlay,
  offsetX = 5,
  offsetY = 5,
  needHold = false,
  className,
  autoAdjustOverflow = true,
  zIndex = 100000,
  customPosition,
  motionOption,
  getPopupContainer = () => document.body
}) => {
  const [isShow, setIsShow] = useState(false);
  const countDownHideTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const [cssProperties, setCssProperties] = useState<CSSProperties>();
  const posRef = useRef<Position>(placement);
  const computeRef = useRef<HTMLDivElement | null>(null);

  const clear = useCallback(() => {
    if (countDownHideTimerRef.current) {
      clearTimeout(countDownHideTimerRef.current);
    }
  }, []);

  const updateCSSProperties = useCallback(
    (anchorEl: HTMLElement) => {
      const anchorElRect = anchorEl.getBoundingClientRect();
      const computeEl = computeRef.current;
      if (!computeEl) return;
      const computeRect = computeEl.getBoundingClientRect();
      let positionRect = getPositionRect(posRef.current, anchorElRect, computeRect, offsetX, offsetY);
      // 尝试自动调整位置
      if (autoAdjustOverflow) {
        const { positionRect: positionRectTemp, pos } = findPositionRect(
          placement,
          anchorElRect,
          computeRect,
          offsetX,
          offsetY,
          customPosition
        );

        if (pos !== 'fail' && positionRectTemp) {
          positionRect = positionRectTemp;
          posRef.current = pos;
        } else if (isDevMode()) {
          console.warn('Popover: 无法找到合适的位置, 使用传入位置');
        }
      }
      setCssProperties(positionRect);
    },
    [offsetX, offsetY, autoAdjustOverflow, placement, customPosition]
  );

  const handleCountDownHide = useCallback(() => {
    clear();
    countDownHideTimerRef.current = setTimeout(
      () => {
        setIsShow(false);
      },
      needHold ? 300 : 0
    );
    return clear;
  }, [needHold, clear]);

  const onMouseEnter = useCallback(
    (e: MouseEvent) => {
      clear();
      let el = e.target as HTMLDivElement;
      while (el && !el.classList.contains(classNameProvider) && document.body !== el) {
        el = el.parentElement as HTMLDivElement;
      }
      updateCSSProperties(el);
      setIsShow(true);
    },
    [updateCSSProperties, clear]
  );

  const returnChildNode = React.Children.map(
    typeof children === 'string' ? <span>{children}</span> : children,
    child => {
      const item = child as React.ReactElement<
        React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
      >;
      return React.cloneElement(item, {
        className: classNames(item.props?.className, classNameProvider),
        onMouseEnter,
        onMouseLeave: () => {
          handleCountDownHide();
        }
      });
    }
  );

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {isShow && (
            <motion.div
              className={classNames(className, 'go-ji-ui-popover')}
              {...(motionOption ? motionOption : getDefaultMotionOption(posRef.current))}
              style={{
                ...cssProperties,
                // 脱离文档流使用fixed
                position: 'absolute',
                zIndex
              }}
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, type: 'tween' }}
              onMouseEnter={() => {
                clear();
                setIsShow(true);
              }}
              onMouseLeave={() => {
                handleCountDownHide();
              }}
            >
              <div className="go-ji-ui-popover-content">{overlay}</div>
            </motion.div>
          )}
        </AnimatePresence>,
        getPopupContainer()
      )}
      {returnChildNode}
      {/* 用于ref计算rect用 */}
      {!cssProperties && (
        <div className="go-ji-ui-popover-compute" ref={computeRef}>
          {overlay}
        </div>
      )}
    </Fragment>
  );
};

export default Popover;
