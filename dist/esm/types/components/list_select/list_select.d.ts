/// <reference types="react" />
interface ListSelectProps {
    items: Array<unknown>;
    mode: "multiple" | 'single';
    value: unknown | [unknown];
    onChange(value: unknown): void;
}
export default function ListSelect({ mode, items }: ListSelectProps): JSX.Element;
export {};
