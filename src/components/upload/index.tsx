import React from 'react'
import styles from './upload.module.less';

interface IUploadProps {
	url: string;
	name: string,
	onClick(): void
}

export default function Upload(props: IUploadProps) {
	const { onClick, url, name } = props
	return <div
		title={name}
		onClick={onClick}
		className={styles.upload}>
		{name}
	</div>
}