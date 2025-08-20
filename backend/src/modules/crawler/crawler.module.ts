import { Module } from '@nestjs/common';
import { CrawlerController } from './controllers/crawler.controller';
import { WebsiteCrawlerService } from './services/website-crawler.service';
import { LinkManagerService } from './services/link-manager.service';
import { ContentModule } from '../content/content.module';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [ContentModule, MediaModule],
  controllers: [CrawlerController],
  providers: [WebsiteCrawlerService, LinkManagerService],
  exports: [WebsiteCrawlerService, LinkManagerService],
})
export class CrawlerModule {}