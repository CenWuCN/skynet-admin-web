# skynet admin web

这是 skynet admin web 页面部分。

使用的技术为 vue3, vue router, vite, typescript, elementplus, echarts。

自行构建本项目请参考 vite 文档。

## 功能
页面上有 4 个标签。分别是 info，Mem，stat，log
1. Info 页面。显示 skynet 所在服务器的处理器，最大内存，每 5 秒采集一次的服务器的 cpu 和内存占用百分比，并且推送到页面上显示
1. Mem 页面。显示 skynet 上每个 service 的地址，内存占用，服务类型（snlua 或者别的类型），启动的服务名字和启动参数。支持按照内存占用或者地址进行排序。
1. Stat 页面。显示 skynet 上每个 service 的地址消息处理情况，包括 cpu 占用时间，处理过的消息数，等待处理的消息数，挂起的消息数量。以上的每一项都支持排序。
1. Log 页面。支持把 skynet 上 skynet.error 打印的消息显示到页面上，更方便的查看日志。

### 功能截图
![host](https://github.com/CenWuCN/skynet-admin-web/blob/main/doc/host.jpg)
![mem](https://github.com/CenWuCN/skynet-admin-web/blob/main/doc/mem.jpg)
![stat](https://github.com/CenWuCN/skynet-admin-web/blob/main/doc/stat.jpg)
![log](https://github.com/CenWuCN/skynet-admin-web/blob/main/doc/log.jpg)
