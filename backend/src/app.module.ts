import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { CrawlerModule } from './modules/crawler/crawler.module';
import { ContentModule } from './modules/content/content.module';
import { MediaModule } from './modules/media/media.module';
import { FileModule } from './modules/file/file.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    CrawlerModule,
    ContentModule,
    MediaModule,
    FileModule,
  ],
  controllers: [AppController],
})
export class AppModule {}