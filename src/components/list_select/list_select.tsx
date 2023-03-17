
import React, { useState } from 'react';
import uuid from 'uuid'

interface ListSelectProps {
	items: Array<unknown>
	mode: "multiple" | 'single'
	value: unknown | [unknown];
	onChange(value: unknown): void
}

export default function ListSelect({
	mode,
	items
}: ListSelectProps) {
	const [] = useState(null)
	return <ul>
		{items.map((i) => {
			return <li key={uuid.v4()}></li>
		})}
	</ul>
}