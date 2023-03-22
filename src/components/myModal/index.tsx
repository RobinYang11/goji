import React from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import './index.less';
interface Iprops {
  visible: boolean;
  Onclose: () => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  title: string;
  children?: React.ReactNode;
  width?: number;
}

const MyModal = (props: Iprops) => {
  const ref = useRef<HTMLDivElement>();
  useEffect(() => {
    if (ref.current) {
      return
    }
    ref.current = document.createElement('div');
    ref.current.setAttribute('id', 'myModal');
    document.body.appendChild(ref.current);
    return () => {
      ref.current && document.body.removeChild(ref.current);
    }
  }, [])
  return (
    (ref.current && props.visible) ? createPortal(
      <div>
        <div className="mask"></div>
        <div className="wrap" style={{ width: props.width || 520 }}>
          <p className="close" onClick={props.Onclose} >X</p>
          {props.header}
          <div className="content">
            {props.children}
          </div>
          {props.footer}
        </div>
      </div>,
      ref.current
    ) as JSX.Element : <div></div>
  )
}

export default MyModal;