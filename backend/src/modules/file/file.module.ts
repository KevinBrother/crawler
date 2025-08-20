import { Module } from '@nestjs/common';
import { FileController } from './controllers/file.controller';

@Module({
  controllers: [FileController],
})
export class FileModule {}