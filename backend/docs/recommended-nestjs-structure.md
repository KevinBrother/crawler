# NestJS 推荐目录结构

## 当前结构存在的问题

当前的 `/backend/src` 目录结构存在以下不符合 NestJS 最佳实践的问题：

1. **模块化不够清晰**：所有服务都放在一个 `CrawlerModule` 中，缺乏功能模块的分离
2. **目录层级混乱**：`controllers`、`services` 目录与模块目录并列，不符合模块化组织
3. **核心服务位置不当**：`core` 目录中的服务应该是全局共享的，但现在被特定模块引用
4. **静态文件位置不当**：`public` 目录不应该在 `src` 内
5. **配置文件组织不当**：配置应该按功能模块组织

## 推荐的目录结构

```
src/
├── main.ts                          # 应用入口文件
├── app.module.ts                     # 根模块
├── app.controller.ts                 # 根控制器
├── app.service.ts                    # 根服务
│
├── common/                           # 通用模块
│   ├── guards/                       # 守卫
│   ├── interceptors/                 # 拦截器
│   ├── pipes/                        # 管道
│   ├── filters/                      # 异常过滤器
│   ├── decorators/                   # 装饰器
│   ├── constants/                    # 常量
│   ├── interfaces/                   # 接口定义
│   ├── types/                        # 类型定义
│   └── utils/                        # 工具函数
│
├── config/                           # 配置模块
│   ├── config.module.ts
│   ├── app.config.ts
│   ├── database.config.ts
│   └── storage.config.ts
│
├── core/                             # 核心模块（全局服务）
│   ├── core.module.ts
│   ├── browser/
│   │   ├── browser.module.ts
│   │   ├── browser.service.ts
│   │   └── browser.service.spec.ts
│   └── storage/
│       ├── storage.module.ts
│       ├── storage.service.ts
│       └── storage.service.spec.ts
│
├── modules/                          # 功能模块
│   ├── crawler/                      # 爬虫模块
│   │   ├── crawler.module.ts
│   │   ├── controllers/
│   │   │   ├── crawler.controller.ts
│   │   │   └── crawler.controller.spec.ts
│   │   ├── services/
│   │   │   ├── website-crawler.service.ts
│   │   │   ├── website-crawler.service.spec.ts
│   │   │   ├── link-manager.service.ts
│   │   │   └── link-manager.service.spec.ts
│   │   ├── dto/
│   │   │   ├── create-crawler.dto.ts
│   │   │   └── update-crawler.dto.ts
│   │   ├── entities/
│   │   │   └── crawler.entity.ts
│   │   └── interfaces/
│   │       └── crawler.interface.ts
│   │
│   ├── content/                      # 内容提取模块
│   │   ├── content.module.ts
│   │   ├── services/
│   │   │   ├── content-extractor.service.ts
│   │   │   └── content-extractor.service.spec.ts
│   │   ├── dto/
│   │   └── interfaces/
│   │
│   ├── media/                        # 媒体处理模块
│   │   ├── media.module.ts
│   │   ├── controllers/
│   │   │   ├── media.controller.ts
│   │   │   └── media.controller.spec.ts
│   │   ├── services/
│   │   │   ├── media-detector.service.ts
│   │   │   ├── media-detector.service.spec.ts
│   │   │   ├── media-downloader.service.ts
│   │   │   ├── media-downloader.service.spec.ts
│   │   │   ├── media-storage.service.ts
│   │   │   └── media-storage.service.spec.ts
│   │   ├── dto/
│   │   ├── entities/
│   │   └── interfaces/
│   │
│   └── file/                         # 文件管理模块
│       ├── file.module.ts
│       ├── controllers/
│       │   ├── file.controller.ts
│       │   └── file.controller.spec.ts
│       ├── services/
│       ├── dto/
│       └── interfaces/
│
└── database/                         # 数据库模块（如果需要）
    ├── database.module.ts
    ├── migrations/
    └── seeds/
```

## 项目根目录结构调整

```
backend/
├── src/                              # 源代码
├── public/                           # 静态文件（移出 src）
├── test/                             # 测试文件
├── docs/                             # 文档
├── docker/                           # Docker 相关文件
├── scripts/                          # 脚本文件
├── package.json
├── tsconfig.json
├── nest-cli.json
└── README.md
```

## 重构建议

### 1. 模块化重构

- **拆分 CrawlerModule**：将当前的大模块拆分为 `crawler`、`content`、`media`、`file` 等独立模块
- **创建核心模块**：将 `BrowserService` 和 `StorageService` 移到 `core` 模块，作为全局服务
- **配置模块化**：按功能创建不同的配置文件

### 2. 文件组织

- **按模块组织**：每个模块内部包含自己的 controllers、services、dto、entities 等
- **共享代码**：将通用的接口、类型、工具函数放到 `common` 目录
- **测试文件**：测试文件与源文件放在同一目录下

### 3. 依赖注入优化

- **模块间依赖**：通过模块导入导出来管理依赖关系
- **全局服务**：核心服务通过 `@Global()` 装饰器设为全局可用
- **配置注入**：使用 ConfigService 进行配置注入

### 4. 代码示例

#### 新的 app.module.ts
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreModule } from './core/core.module';
import { CrawlerModule } from './modules/crawler/crawler.module';
import { MediaModule } from './modules/media/media.module';
import { ContentModule } from './modules/content/content.module';
import { FileModule } from './modules/file/file.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CoreModule,
    CrawlerModule,
    MediaModule,
    ContentModule,
    FileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

#### 新的 core.module.ts
```typescript
import { Global, Module } from '@nestjs/common';
import { BrowserModule } from './browser/browser.module';
import { StorageModule } from './storage/storage.module';

@Global()
@Module({
  imports: [BrowserModule, StorageModule],
  exports: [BrowserModule, StorageModule],
})
export class CoreModule {}
```

## 迁移步骤

1. **创建新的模块结构**
2. **移动和重组文件**
3. **更新导入路径**
4. **调整模块依赖关系**
5. **更新测试文件**
6. **验证功能完整性**

这种结构更符合 NestJS 的设计理念，提供了更好的模块化、可维护性和可扩展性。