import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

export default function useExtension<T extends HTMLElement | null>(
  root: T,
  extSelector?: string,
  extension?: ReactNode
): ReactNode {
  const [portalContainer, setPortalContainer] = useState<HTMLElement>();
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!rootRef) return;
    if (!extension) return;
    if (!extSelector) {
      throw new Error("'extSelector' not provide!");
    }
    const container: unknown = rootRef.current?.querySelector(extSelector);
    if (container) {
      setPortalContainer(container as HTMLElement);
    }
  }, [rootRef.current, extSelector, extension]);

  const ext = useMemo(() => {
    return portalContainer ? createPortal(extension, portalContainer) : null;
  }, [portalContainer]);

  return ext;
}
