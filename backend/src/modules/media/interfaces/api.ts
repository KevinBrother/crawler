// 媒体模块的API类型定义

export interface MediaFileInfo {
  url: string;
  originalUrl: string; // 原始URL
  type: 'image' | 'video' | 'audio' | 'document' | 'archive';
  extension: string;
  fileName: string;
  sourceUrl: string;
  size?: number;
  fileSize: number; // 文件大小
  downloadedAt?: string;
  downloadTime: string; // 下载时间
  storagePath?: string;
  md5Hash?: string;
  sessionId: string; // 会话ID
  mimeType: string; // MIME类型
  metadata?: {
    [key: string]: any;
  };
}

export interface MediaStats {
  totalFiles: number;
  totalSessions: number;
  totalSize: number; // 总大小（字节）
  filesByType: Record<string, number>;
  filesBySession: Record<string, number>;
  fileTypes: Record<string, number>; // 按文件类型统计
}

export interface MediaDownloadResult {
  success: boolean;
  mediaFile?: MediaFileInfo;
  error?: string;
}