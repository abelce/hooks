---
description: useBattery
group: Effect
toc: content
---

# useBattery

获取设备电池信息

## 代码演示

<code src="let-hooks/useBattery/demos/base.tsx" title="基本用法" description="可以通过插入/拔掉充电器观察效果"></code>

## 返回值

| 属性名          | 类型      | 描述                                             |
| --------------- | --------- | ------------------------------------------------ |
| isSupport       | `boolean` | 浏览器是否支持                                   |
| charging        | `boolean` | 是否正在充电                                     |
| chargingTime    | `number`  | 代表距离充电完毕还需多少秒，如果为 0 则充电完毕  |
| dischargingTime | `number`  | 代表距离电池耗电至空且系统挂起需要多少秒         |
| level           | `number`  | 代表系统电量的水平，这个值放缩在 0.0 至 1.0 之间 |
