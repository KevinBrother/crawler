# 项目介绍

## dev

``` bash
# 重新构建 crawler-backend 服务
docker-compose build --no-cache crawler-backend

# 启动项目
cd docker

docker-compose up -d
# 查看项目日志
docker-compose logs -f
```

## TODO

[ ] 爬虫业务数据库

## 业务功能

下面[xxx]的内容为可选内容,可以后面优化再做,主要是提速与资源利用相关的功能。

爬虫服务，主要提供网站爬虫功能，[支持自定义爬虫规则，支持多线程并发爬取，]支持数据存储到数据库中，支持数据可视化展示。
爬取任务可以取消，支持暂停和继续。
支持设置爬取深度，支持设置爬取时间间隔，[支持设置爬取线程数]。
爬取到的文件存储在 minio中，爬取任务信息存储在 mysql 中。
需要支持预览爬取到的文件，支持文件下载。

### 文件存储

文件存储在 minio 中，每个文件都有一个唯一的文件名，文件名是根据文件的内容计算出来的，文件名的计算规则是文件内容的 md5 值。
每个文件都有一个文件元数据，文件元数据包含文件的文件名、文件的大小、文件的创建时间、文件的修改时间、文件的访问时间、文件的标签等。
文件元数据存储在 mysql 中。
mysql 中的元数据通过文件名和文件内容的 md5 值对应起来。
文件内容存储在 minio 中，文件内容的存储路径是根据文件的 md5 值计算出来的，存储路径的计算规则是文件内容的 md5 值的前两位作为目录，文件内容的 md5 值作为文件名。
文件内容的存储路径示例：
minio 中文件的存储路径示例：

```
/12/34/1234567890abcdef1234567890abcdef.txt
```

mysql 字段示例：

``` sql
CREATE TABLE `file` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `filesize` int(11) NOT NULL,
  `filemd5` varchar(255) NOT NULL,
  `filepath` varchar(255) NOT NULL,
  `createtime` datetime NOT NULL,
  `updatetime` datetime NOT NULL,
  `accesstime` datetime NOT NULL,
  `tag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filemd5` (`filemd5`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 文件预览

文件预览需要根据文件的类型来判断，支持的文件类型有：txt、pdf、docx、xlsx、pptx、jpg、jpeg、png、gif、bmp等。
文件预览的实现方式有：

- 对于 txt 文件，直接在页面上展示文件内容。
- 对于 pdf 文件，使用 pdf.js 来展示文件内容。
- 对于 docx、xlsx、pptx 文件，使用 office.js 来展示文件内容。
- 对于 jpg、jpeg、png、gif、bmp 文件，使用 img 标签来展示文件内容。
- 对于其他文件类型，使用 a 标签来展示文件下载链接。
- 对于文件预览，需要支持文件的缩放、旋转、打印等功能。
- 对于文件预览，需要支持文件的搜索功能。
- 对于文件预览，需要支持文件的标签功能。
- 对于文件预览，需要支持文件的分享功能。
- 对于文件预览，需要支持文件的评论功能。
- 对于文件预览，需要支持文件的下载功能。

### 任务管理

任务管理需要支持任务的创建、暂停、继续、取消、删除、查看任务信息、查看任务日志等功能。
任务信息需要存储在 mysql 中，任务日志需要存储在 minio 中。
任务日志的存储路径示例：

```
/12/34/1234567890abcdef1234567890abcdef.log
```

任务日志的内容示例：

```
2023-01-01 00:00:00 [INFO] 任务开始
2023-01-01 00:00:01 [INFO] 任务结束
```

任务信息的字段示例：

``` sql
CREATE TABLE `task` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `taskname` varchar(255) NOT NULL,
  `tasktype` varchar(255) NOT NULL,
  `taskurl` varchar(255) NOT NULL,
  `taskdepth` int(11) NOT NULL,
  `taskinterval` int(11) NOT NULL,
  `taskthread` int(11) NOT NULL,
  `taskstatus` varchar(255) NOT NULL, 
  `taskcreatetime` datetime NOT NULL,
  `taskupdatetime` datetime NOT NULL,
  `taskaccesstime` datetime NOT NULL,
  `tasktag` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```
