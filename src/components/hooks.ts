
import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';

export default function useExtension<T extends HTMLElement | null>(
	root: T,
	extSelector?: string,
	extension?: ReactNode
): ReactNode {

	const [portalContainer, setPortalContainer] = useState<HTMLElement>()
	const rootRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {

		if (!rootRef) return;
		if (!extension) return;
		if (!extSelector) {
			throw new Error("'extSelector' not provide!");
		}

		const container: unknown = rootRef.current?.querySelector(extSelector)
		if (container) {
			setPortalContainer(container as HTMLElement);
		}

	}, [rootRef.current])

	const ext = useMemo(() => {
		return portalContainer ? extension : null
	}, [portalContainer])

	return ext;
}