import { UploadFile } from "./upload";

export function file2uploadFile(file: File): UploadFile {
	return {
		lastModified: file.lastModified,
		name: file.name,
		size: file.size,
		type: file.type,
		originFileObj: file,
	};
}