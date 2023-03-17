import React, { useRef } from 'react'
import styles from './upload.module.less';

interface IUploadProps {
	uploadUrl: string;
	children: React.ReactNode;
	onComplete?(data: unknown): void;
	beforeUpload?(): void
}

export default function Upload(props: IUploadProps) {

	const { children, uploadUrl, onComplete } = props
	const inputRef = useRef<any>();

	const uploadFile = (files: FileList) => {
		const promiese = []
		for (let i = 0; i < files.length; i++) {
			promiese.push(new Promise((resolve, reject) => {
				const xhr = new XMLHttpRequest();
				const formData = new FormData();
				formData.append('file', files[i])
				xhr.open('POST', uploadUrl)
				xhr.send(formData)
				xhr.onerror = err => {
					reject(err)
				}
				xhr.onload = () => {
					let result;
					try {
						result = JSON.parse(xhr.response)
					} catch (e) {
						result = xhr.response;
					}
					resolve(result)
				}
			}))
		}

		Promise.all(promiese).then(res => {
			onComplete?.(res)
		})
	}

	return <span
		onClick={() => {
			inputRef.current.click();
		}}
		className={styles.upload}
	>
		{children}
		<input
			multiple
			onChange={e => {
				if (e.target.files) {
					uploadFile(e.target.files)
				}
			}}
			ref={inputRef}
			type="file"
		/>
	</span>
}