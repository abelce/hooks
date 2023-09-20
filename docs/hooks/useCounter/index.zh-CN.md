---
description: useCounter
group: State
toc: content
---

# useCounter

计数器，可以增加/减少/重置数值。

## 代码演示

<code src="let-hooks/useCounter/demos/base.tsx" title="基本用法" description="可以通过插入/拔掉充电器观察效果"></code>

## 参数

| 属性名    | 描述   | 类型     | 默认值 | 是否必填 |
| --------- | ------ | -------- | ------ | -------- |
| initValue | 初始值 | `number` | --     | 必填     |
| options   | 可选项 | `object` | --     | 非必填   |

### options

| 属性名 | 描述                       | 类型     | 默认值 | 是否必填 |
| ------ | -------------------------- | -------- | ------ | -------- |
| min    | 最小值                     | `number` | --     | 非必填   |
| max    | 最大值                     | `number` | --     | 非必填   |
| delta  | 默认的变化差值，默认值为 1 | `number` | 1      | 非必填   |

## 返回值

```ts
const [current, { inc, dec, set, reset }] = useCounter(initValue);
```

| 属性名  | 类型                       | 描述                                            |
| ------- | -------------------------- | ----------------------------------------------- |
| current | `number`                   | 当前的值                                        |
| inc     | `(delta?: number) => void` | 加`delta`，`delta`不传就是用 options 中的 delta |
| dec     | `(delta?: number) => void` | 减`delta`                                       |
| set     | `(value: number) => void`  | 设置值                                          |
| reset   | `(value?: number) => void` | 重置值为`value`，不传`value`就重置为`initValue` |
