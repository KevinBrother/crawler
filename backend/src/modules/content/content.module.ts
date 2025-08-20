import { Module } from '@nestjs/common';
import { ContentExtractorService } from './services/content-extractor.service';

@Module({
  providers: [ContentExtractorService],
  exports: [ContentExtractorService],
})
export class ContentModule {}