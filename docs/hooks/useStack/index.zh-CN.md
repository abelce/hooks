---
description: useQueue
group: State
toc: content
---

# useQueue

使用栈的 hook

## 代码演示

<code src="let-hooks/useStack/demos/base.tsx" title="基本用法"></code>

## 用法

```ts
const {
  push;
  pop;
  first;
  size;
} = useStack([]);
```

## 参数

| 属性名     | 描述   | 类型  | 默认值 | 是否必填 |
| ---------- | ------ | ----- | ------ | -------- |
| initValues | 初始值 | `T[]` | ---    | 非必填   |

## 返回值

| 属性名 | 类型                | 描述       |
| ------ | ------------------- | ---------- |
| push   | `(item: T) => void` | 入队       |
| pop    | `() => T`           | 出队       |
| first  | `T`                 | 第一个元素 |
| size   | `number`            | 队列长度   |
