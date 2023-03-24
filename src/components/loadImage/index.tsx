import React, { FC, useCallback, useEffect, useRef } from "react";
import styles from "./index.module.less";

interface Images {
  src: string;
  link?: string;
  title?: string;
  alt?: string;
  rel?: string;
}

interface LoadProps {
  imagesData: Images[];
  duration?: number;
  delay?: number;
}

const LoadImage: FC<LoadProps> = (props) => {
  const { imagesData, duration = 5000, delay = 0 } = props;
  const currentIndex = useRef<number>(0);
  const transitionHeight = useRef<number>(0);
  const imgHeight = useRef<number>(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const animateTimeout = useRef<NodeJS.Timeout>();
  const delayTimeout = useRef<NodeJS.Timeout>();

  const animate = useCallback(() => {
    (function timeout() {
      animateTimeout.current = setTimeout(() => {
        timeout();
        const slideEle = slideRef.current;
        if (slideEle) {
          const currentChildren = slideEle.children[
            currentIndex.current
          ] as HTMLAnchorElement;
          currentChildren && currentIndex.current++;
          currentChildren.style.opacity = "0";

          setTimeout(() => {
            transitionHeight.current += imgHeight.current;
            (slideEle.style.transform = `translateY(-${transitionHeight.current}px)`),
              (slideEle.style.transition = "all .5s ease-in-out"),
              setTimeout(() => {
                slideEle.style.transition = "";
                if (slideEle.children.length / 2 === currentIndex.current) {
                  for (let i = 0; i < slideEle.children.length; i++) {
                    (slideEle.children[i] as HTMLAnchorElement).style.opacity =
                      "1";
                  }
                  setTimeout(() => {
                    currentIndex.current = 0;
                    transitionHeight.current = 0;
                    slideEle.style.transform = "translateY(0)";
                  }, 500);
                }
              }, 550);
          }, 180);
        }
      }, duration);
    })();
  }, [duration]);

  const visibleChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      delayTimeout.current = setTimeout(() => {
        animate();
      }, delay);
    } else {
      clearTimeout(animateTimeout.current);
      clearTimeout(delayTimeout.current);
    }
  }, [delay]);

  useEffect(() => {
    // calc element height + margin top = imgHeight
    if (slideRef.current) {
      const imgEle = slideRef.current.children[0] as HTMLAnchorElement;
      const imgEleHeight = imgEle?.getBoundingClientRect()?.height || 0;
      const imgEleMarginTop =
        parseInt(window?.getComputedStyle(imgEle!, null)?.marginTop) || 0;
      imgHeight.current = imgEleHeight + imgEleMarginTop;
    }
  }, [slideRef.current]);

  useEffect(() => {
    if (slideRef.current) {
      delayTimeout.current = setTimeout(() => {
        animate();
      }, delay);
    }

    document.addEventListener("visibilitychange", visibleChange);

    return () => {
      clearTimeout(animateTimeout.current),
        clearTimeout(delayTimeout.current),
        document.removeEventListener("visibilitychange", visibleChange);
    };
  }, [slideRef.current, delay, animate, visibleChange]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div ref={slideRef}>
          {[...imagesData, ...imagesData]?.map(
            ({ link = "#", src, title, alt, rel }, index) => (
              <a
                title={title}
                rel={rel}
                className={styles.link}
                href={decodeURIComponent(link)}
                key={`${link}-${src}-${index}`}
              >
                <img src={decodeURIComponent(src)} alt={alt || title} />
              </a>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default LoadImage;
