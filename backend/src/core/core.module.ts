import { Global, Module } from '@nestjs/common';
import { BrowserModule } from './browser/browser.module';
import { StorageModule } from './storage/storage.module';

@Global()
@Module({
  imports: [BrowserModule, StorageModule],
  exports: [BrowserModule, StorageModule],
})
export class CoreModule {}