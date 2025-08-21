// 文件模块的API类型定义

export interface FileDownloadResponse {
  downloadUrl: string;
  fileName: string;
  size?: number;
  contentType?: string;
}

export interface FileInfo {
  name: string;
  size: number;
  lastModified: Date | string;
  etag: string;
  originalUrl?: string | null;
  sourcePageUrl?: string | null;
  traceability?: any;
}