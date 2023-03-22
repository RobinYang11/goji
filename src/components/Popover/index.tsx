import { getWindowSize } from './helper';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment, useCallback, useRef, useState } from 'react';
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
}> = ({ children, placement, overlay, offsetX = 5, offsetY = 5, needHold = false, className, zIndex = 100000 }) => {
  const [isShow, setIsShow] = useState(false);
  const [position, setPosition] = useState<{
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
    transform?: string;
  }>({});
  const countDownHideTimerRef = useRef<NodeJS.Timeout>();
  const handleCountDownHide = useCallback(() => {
    // TODO ESlint
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    clearTimeout(countDownHideTimerRef.current!);

    countDownHideTimerRef.current = setTimeout(
      () => {
        setIsShow(false);
      },
      needHold ? 300 : 0
    );
    return () => {
      // TODO ESlint
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      clearTimeout(countDownHideTimerRef.current!);
    };
  }, [needHold]);
  const returnChildNode = React.Children.map(children, child => {
    const item = child as React.ReactElement<
      React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
    >;
    return React.cloneElement(item, {
      className: classNames(item.props?.className, classNameProvider),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onMouseEnter: (e: any) => {
        // TODO ESlint
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        clearTimeout(countDownHideTimerRef.current!);
        let el = e.target as HTMLDivElement;
        // 点击事件后直接出现在鼠标指针下，事件有可能是子元素触发
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
                position: 'fixed',
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
                // TODO ESlint
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                clearTimeout(countDownHideTimerRef.current!);
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
        document.body
      )}
      {returnChildNode}
    </Fragment>
  );
};

export default Popover;
