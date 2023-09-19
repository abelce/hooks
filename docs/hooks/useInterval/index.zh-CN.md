---
description: useInterval
group: Effect
toc: content
---

# useInterval

interval 的 hook，可以停止、重新开始。

## 代码演示

<code src="let-hooks/useInterval/demos/base.tsx" title="基本用法"></code>

## 参数

| 属性名  | 描述          | 类型                                                | 默认值 | 是否必填 |
| ------- | ------------- | --------------------------------------------------- | ------ | -------- |
| fn      | interval 回调 | `Function`                                          | --     | 必填     |
| options | 可选项        | `{delay?: number;immediate?:boolean;} \| undefined` | --     | 非必填   |

### options

| 属性名    | 描述         | 类型                             | 默认值 | 是否必填 |
| --------- | ------------ | -------------------------------- | ------ | -------- |
| delay     | 延时         | `number \| number`               | --     | 非必填   |
| immediate | 是否立即开始 | `immediate:boolean \| undefined` | --     | 非必填   |

## 返回值

| 属性名 | 类型         | 描述        |
| ------ | ------------ | ----------- |
| run    | `() => void` | 开始        |
| clear  | `()=> void`  | 停止        |
| reset  | `()=> void`  | `run`的别名 |
