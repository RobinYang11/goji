import React, { ReactNode, useMemo, useRef, useState } from "react";
import styles from "./upload.module.less";
import { file2uploadFile } from "./utils";

export interface UploadFile {
  lastModified: number;
  name: string;
  size: number;
  type: string;
  response?: unknown;
  originFileObj: File;
}

export interface IUploadProps {
  uploadUrl: string;
  children: React.ReactNode;
  onComplete?(data: Array<unknown>): void;
  beforeUpload?(files: FileList): Promise<unknown>;
  customList?(list: Array<unknown>): ReactNode;
  valueFilter?(file: UploadFile): unknown;
}

export default function Upload(props: IUploadProps) {
  const {
    beforeUpload,
    children,
    uploadUrl,
    onComplete,
    customList,
    valueFilter,
  } = props;

  const inputRef = useRef<any>();
  let [_files, setFiles] = useState<Array<unknown>>([]);

  const uploadFile = (files: FileList) => {
    if (!beforeUpload) {
      doUpload(files);
      return;
    }
    beforeUpload?.(files)
      .then((f) => {
        doUpload(files);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const doUpload = (files: FileList) => {
    console.log("#", files);
    const promiese: Array<Promise<unknown>> = [];

    for (let i = 0; i < files.length; i++) {
      promiese.push(
        new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          const formData = new FormData();
          formData.append("file", files[i]);
          xhr.open("POST", uploadUrl);
          xhr.send(formData);
          xhr.onerror = (err) => {
            reject(err);
          };
          xhr.onload = () => {
            let resp: unknown;
            try {
              resp = JSON.parse(xhr.response);
            } catch (e) {
              resp = xhr.response;
            }

            const res = file2uploadFile(files[i]);
            const uplaodFile = Object.assign(
              {
                response: resp,
              },
              res
            );

            resolve(uplaodFile);
            // resolve(valueFilter?.(abc) || resp)
          };
        })
      );
    }

    Promise.all(promiese).then((res) => {
      console.log("##", res);
      _files = _files.concat(res);
      setFiles([..._files]);
      onComplete?.(_files);
    });
  };

  const list = useMemo(() => {
    if (customList) return customList(_files);
    return _files.map((i: any, index) => {
      console.log("Abc", i);
      return (
        <li className={styles.fileItem}>
          {i.type}
          <img src={i} style={{ width: "100px" }} />
          <span
            onClick={() => {
              _files?.splice(index, 1);
              setFiles([..._files]);
            }}
            className={styles.deleteItem}
          >
            delete
          </span>
        </li>
      );
    });
  }, [_files]);

  return (
    <span className={styles.upload}>
      <input
        multiple
        onChange={(e) => {
          console.log("E", e.target.files);
          if (e.target.files) {
            uploadFile(e.target.files);
          }
        }}
        ref={inputRef}
        type="file"
      />
      <ul className={styles.fileList}>
        <li>
          <span
            onClick={() => {
              inputRef.current.click();
            }}
          >
            {children}
          </span>
        </li>
        {list}
      </ul>
    </span>
  );
}
