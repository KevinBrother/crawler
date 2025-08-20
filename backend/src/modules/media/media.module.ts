import { Module } from '@nestjs/common';
import { MediaController } from './controllers/media.controller';
import { MediaDetectorService } from './services/media-detector.service';
import { MediaDownloaderService } from './services/media-downloader.service';
import { MediaStorageService } from './services/media-storage.service';

@Module({
  controllers: [MediaController],
  providers: [MediaDetectorService, MediaDownloaderService, MediaStorageService],
  exports: [MediaDetectorService, MediaDownloaderService, MediaStorageService],
})
export class MediaModule {}