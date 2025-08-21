import { describe, it, expect, beforeEach, vi, Mocked } from "vitest";
import { MediaController } from "./media.controller";
import { StorageService } from "../../../core/storage/storage.service";
import {
  MediaFileInfo,
} from '../../../types';
import { MediaStorageService } from "../services/media-storage.service";

describe("MediaController", () => {
  let controller: MediaController;
  let mediaStorageService: any;

  beforeEach(async () => {
    // 创建简单的 mock 对象
    const storageService = {
      getClient: vi.fn(),
      getBucketName: vi.fn(),
    } as unknown as Mocked<StorageService>;

    mediaStorageService = {
      getSessionMediaFiles: vi.fn(),
      getMediaFilesByType: vi.fn(),
      getMediaFilesByExtension: vi.fn(),
      getAllMediaFilesStats: vi.fn(),
      searchMediaFiles: vi.fn(),
      getMediaFile: vi.fn(),
    } as unknown as Mocked<MediaStorageService>;

    // 直接创建控制器实例，手动注入依赖
    controller = new MediaController(
      storageService,
      mediaStorageService
    );

    // 验证依赖注入是否正确
    expect(controller).toBeDefined();
    expect(mediaStorageService).toBeDefined();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("getSessionMediaFiles", () => {
    it("should return media files for a session", async () => {
      const sessionId = "test-session";
      const mockMediaFiles: MediaFileInfo[] = [
        {
          fileName: "test.jpg",
          url: "https://example.com/test.jpg",
          sourceUrl: "https://example.com",
          originalUrl: "https://example.com/test.jpg",
          fileSize: 1024,
          downloadTime: new Date().toISOString(),
          sessionId,
          mimeType: "image/jpeg",
          type: "image",
          extension: "jpg",
          size: 1024,
          downloadedAt: new Date().toISOString(),
          storagePath: "path/to/test.jpg",
        },
      ];

      mediaStorageService.getSessionMediaFiles.mockResolvedValue(
        mockMediaFiles
      );

      const result = await controller.getSessionMediaFiles(sessionId);
      expect(result.files).toEqual(mockMediaFiles);
      expect(result.total).toBe(1);
      expect(mediaStorageService.getSessionMediaFiles).toHaveBeenCalledWith(
        sessionId
      );
    });
  });
});
