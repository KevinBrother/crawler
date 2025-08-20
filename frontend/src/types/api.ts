// 导入共享的API类型定义
export * from '@crawler/backend/types';

// 重新导出常用类型，保持向后兼容
export type {
  ApiResponse,
  CrawlRequest,
  CrawlResponse,
  CrawSession,
  MediaFileInfo,
  MediaStats,
  SearchParams,
  PaginatedResponse,
  FileDownloadResponse,
  FileInfo,
  PageData,
  LinkInfo,
  MediaDownloadResult,
  HealthCheckResponse,
  StopCrawlResponse,
  MediaTypeConfig,
  MediaCrawlOptions
} from '@crawler/backend/types';