---
description: useNetwork
group: Effect
toc: content
---

# useNetwork

获取设备的网络信息

## 代码演示

<code src="let-hooks/useNetwork/demos/base.tsx" title="基本用法" description="切换设备的网络查看数据"></code>

## 返回值

<style>
table th:first-of-type {
    width: 100px;
}
table th:nth-of-type(2) {
    width: 100px;
}
</style>

| 属性名        | 类型      | 描述                                                                                                               |
| ------------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| effectiveType | `string`  | 连接的有效类型，可能的值`slow-2g`,`2g`,`3g`,`4g`                                                                   |
| downlink      | `number`  | 下载速度（Mbps)                                                                                                    |
| downlinkMax   | `number`  | 最大下载速度（Mbps)                                                                                                |
| rtt           | `number`  | 往返时延                                                                                                           |
| saveData      | `boolean` | 如果用户设备上设置了减少数据使用的选项时返回 true                                                                  |
| type          | `string`  | 设备用于与网络通信的连接类型, 可能的值: `bluetooth`,`cellular`,`ethernet`,`wifi`,`wimax`,`none`,`other`,` unknown` |
