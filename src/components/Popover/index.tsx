import { getWindowSize } from './helper';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, useCallback, useRef, useState, MouseEvent } from 'react';
import ReactDOM from 'react-dom';

const classNameProvider = 'Popover-Provider';
const Popover: React.FunctionComponent<{
  /**
   * 显示位置
   */
  placement: 'left' | 'right' | 'top';
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
  // 内容暂不支持string
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
  zIndex = 100000,
  getPopupContainer = () => document.body
}) => {
  const [isShow, setIsShow] = useState(false);
  const [position, setPosition] = useState<{
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    transform?: string;
  }>({});
  const countDownHideTimerRef = useRef<ReturnType<typeof setTimeout>>();

  const clear = useCallback(() => {
    if (countDownHideTimerRef.current) {
      clearTimeout(countDownHideTimerRef.current);
    }
  }, []);

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
  const returnChildNode = React.Children.map(children, child => {
    const item = child as React.ReactElement<
      React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >;
    return React.cloneElement(item, {
      className: classNames(item.props?.className, classNameProvider),
      onMouseEnter: (e: MouseEvent) => {
        clearTimeout(countDownHideTimerRef.current!);
        let el = e.target as HTMLDivElement;
        while (el && !el.classList.contains(classNameProvider) && document.body !== el) {
          el = el.parentElement as HTMLDivElement;
        }
        const rect = el.getBoundingClientRect();
        const winSize = getWindowSize();

        if (placement === 'left') {
          setPosition({
            top: rect.top + offsetY,
            right: winSize.width - rect.left + offsetX
          });
        }
        if (placement === 'right') {
          setPosition({
            top: rect.top + offsetY,
            left: rect.left + rect.width + offsetX
          });
        }
        if (placement === 'top') {
          setPosition({
            bottom: winSize.height - rect.top + offsetY,
            left: rect.left + rect.width / 2,
            transform: `translateX(-50%)`
          });
        }

        setIsShow(true);
      },
      onMouseLeave: () => {
        handleCountDownHide();
      }
    });
  });

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <AnimatePresence>
          {isShow && (
            <motion.div
              className={className}
              style={{
                // 脱离文档流使用fixed
                position: 'absolute',
                zIndex,
                left: position.left + 'px',
                top: position.top + 'px',
                right: position.right + 'px',
                bottom: position.bottom + 'px',
                transform: position.transform
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
              {overlay}
            </motion.div>
          )}
        </AnimatePresence>,
        getPopupContainer()
      )}
      {returnChildNode}
    </Fragment>
  );
};

export default Popover;
