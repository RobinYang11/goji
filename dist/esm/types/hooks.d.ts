import { ReactNode } from 'react';
export default function useExtension<T extends HTMLElement | null>(root: T, extSelector?: string, extension?: ReactNode): ReactNode;
