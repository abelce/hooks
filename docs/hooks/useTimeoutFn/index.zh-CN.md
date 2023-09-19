---
description: useTimeoutFn
group: Effect
toc: content
---

# useTimeoutFn

在计时结束后执行回调函数，同时提供`cancel/reset`方法来取消或者重新计时

## 代码演示

<code src="let-hooks/useTimeoutFn/demos/base.tsx" title="基本用法"></code>
<code src="let-hooks/useTimeoutFn/demos/immediate.tsx" title="立即执行" description="设置immediate=true，会立即开始计时"></code>

## 参数

| 属性名  | 描述     | 类型        | 默认值 | 是否必填 |
| ------- | -------- | ----------- | ------ | -------- |
| fn      | 回调函数 | `()=> void` | --     | 必填     |
| options | 可选项   | {}          | {}     | 非必填   |

### options

| 属性名    | 描述                                 | 类型      | 默认值 | 是否必填 |
| --------- | ------------------------------------ | --------- | ------ | -------- |
| delay     | 延迟时间（毫秒）                     | `number`  | 0      | --       |
| immediate | 是否立即执行(设置后会立即开始倒计时) | `boolean` | false  | 非必填   |

## 返回值

| 属性名  | 类型                    | 描述                                                                                      |
| ------- | ----------------------- | ----------------------------------------------------------------------------------------- |
| isReady | `() => null \| boolean` | 执行状态，返回结果 `null/false/true`,`null`:未开始，`false`:已开始但未完成，`true`:已完成 |
| reset   | `()=> void`             | 重新执行                                                                                  |
| cancel  | `()=> void`             | 取消执行                                                                                  |
| run     | `()=> void`             | 执行(reset 的别名)                                                                        |
