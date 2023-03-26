import React, { useState, useRef, ReactNode } from "react";
import styles from "./index.less";
import { useClickAway } from "../../util/clickAway";

export default ({
  children,
  title,
  content,
}: {
  children: string | ReactNode;
  title:string | ReactNode;
  content:string | ReactNode;
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const ref = useRef(null);
  const ContainerRef = useRef(null);
  useClickAway(() => {
    setVisible(false);
  }, [ref, ContainerRef]);
      return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <div onClick={() => setVisible(!visible)} ref={ref}>
        {children}
      </div>
      <div className={styles.popContanier} ref={ContainerRef} style={{display:visible ? 'block' : 'none'}}>
            {visible && <>
                {title && <div className={styles.title}>
                {title}
            </div>}
            {content && <div className={styles.content}>
                {content}
            </div>}
            </>}
        </div>
    </div>
  );
};
