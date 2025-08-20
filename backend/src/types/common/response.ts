// 通用响应类型定义

// 通用API响应包装器
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  timestamp?: string;
}

// 分页响应
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasMore: boolean;
}

// 搜索参数
export interface SearchParams {
  query?: string;
  sessionId?: string;
  type?: string;
  fileType?: string; // 文件类型过滤
  page?: number;
  limit?: number;
}

// 健康检查响应
export interface HealthCheckResponse {
  status: string;
  timestamp: string;
}