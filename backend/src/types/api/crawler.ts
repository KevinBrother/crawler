// 爬虫相关的API类型定义

// 爬虫相关类型 - 统一的爬取请求接口
export interface CrawlRequest {
  startUrl: string;
  options: {
    waitFor?: number;
    screenshot?: boolean;
    fullPage?: boolean;
    maxDepth?: number;
    maxPages?: number;
    enableMediaCrawl?: boolean;
    userAgent?: string;
    headers?: Record<string, string>;
    cookies?: Array<{
      name: string;
      value: string;
      domain?: string;
      path?: string;
    }>;
    allowedDomains?: string[];
    excludePatterns?: string[];
    mediaTypes?: Record<string, {
      mode: 'inherit' | 'override';
      extensions?: string[];
    }>;
    downloadLimits?: {
      maxFileSize?: number;
      maxTotalSize?: number;
      downloadTimeout?: number;
      maxConcurrent?: number;
      skipDuplicates?: boolean;
    };
  };
}

export interface CrawlResponse {
  sessionId: string;
  status: 'started' | 'completed' | 'failed';
  message: string;
  pagesProcessed?: number;
  totalPages?: number;
  errors?: string[];
}

export interface CrawSession {
  id: string; // 会话ID（用于列表显示）
  sessionId: string;
  config: CrawlRequest; // 爬取配置
  startTime: Date | string;
  endTime?: Date | string;
  status: 'running' | 'completed' | 'failed' | 'stopped';
  pagesProcessed: number;
  totalPages: number;
  errors: string[];
  // 冗余字段，方便前端显示
  startUrl: string; // 等同于 config.url
  maxDepth: number; // 等同于 config.options.maxDepth
  maxPages: number; // 等同于 config.options.maxPages
  isCompleteCrawl: boolean;
  takeScreenshots: boolean; // 等同于 config.options.screenshot
  userAgent?: string; // 等同于 config.options.userAgent
  allowedDomains: string[]; // 等同于 config.options.allowedDomains
  excludePatterns: string[]; // 等同于 config.options.excludePatterns
  mediaOptions?: MediaCrawlOptions; // 从 config.options 派生
}

// 媒体类型配置
export interface MediaTypeConfig {
  type: 'image' | 'video' | 'audio' | 'document' | 'archive';
  mode: 'inherit' | 'override';
  extensions?: string[];
}

export interface MediaCrawlOptions {
  enabled: boolean;
  mediaTypes: MediaTypeConfig[];
  maxFileSize?: number; // MB
  downloadTimeout?: number; // seconds
  concurrent?: number;
}

// 页面数据接口
export interface PageData {
  url: string;
  title?: string;
  content: string;
  metadata: {
    depth: number;
    parentUrl?: string;
    crawledAt: string;
    contentType?: string;
    statusCode?: number;
    [key: string]: any;
  };
}

// 链接信息接口
export interface LinkInfo {
  url: string;
  depth: number;
  parentUrl?: string;
  discovered: boolean;
  processed: boolean;
}

// 停止爬取响应
export interface StopCrawlResponse {
  success: boolean;
  message: string;
}

// 爬取配置类型别名
export type CrawlConfig = CrawlRequest;