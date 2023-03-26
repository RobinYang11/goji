import React, { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./index.less";

export default ({ request }: { request: () => any }) => {
  const [data, setData] = useState<any[]>([]);
  const ref = useRef<any>(null);
  const visibleRef = useRef<any>(null);
  useEffect(() => {
    if (!visibleRef.current || !ref.current) return;
    const obs = new IntersectionObserver(
      (e) => {
        e.forEach((element) => {
          if (element.isIntersecting) {
            request &&
              request().then((res: any) => {
                console.log(res, "res");
                setData((v) => [...v, ...res]);
              });
          }
        });
      },
      { root: ref.current }
    );
    obs.observe(visibleRef.current);
  }, []);
  useEffect(() => {
    const imageList = Array.from(ref.current?.children);

    if (!ref.current) {
      return;
    }
    const inter = new IntersectionObserver(
      (entries) => {
        entries.forEach((item: any) => {
          if (item.isIntersecting) {
            item.target.src = JSON.parse(
              item.target.dataset?.value || "{}"
            )?.src;
            item.target.alt = JSON.parse(
              item.target.dataset?.value || "{}"
            )?.alt;
            inter.unobserve(item.target)
          }
        });
      },
      { root: ref.current }
    );
    imageList.map((el: any) => {
      inter.observe(el);
    });

  }, [data]);
  return (
    <div ref={ref} style={{ maxHeight: "500px", overflow: "auto" }}>
      {data?.map((el, i) => {
        return (
          <img
            key={i}
            style={{ width: "100px", height: "100px" }}
            className={styles.img}
            data-value={JSON.stringify(el)}
            src=""
            alt=""
          />
        );
      })}
      <div ref={visibleRef}></div>
    </div>
  );
};
