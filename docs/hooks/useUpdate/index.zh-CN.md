---
description: useUpdate返回一个函数，用来强制刷新组件。
group: Effect
toc: content
---

# useUpdate

返回一个函数，用来强制刷新组件。

## 何时使用

- 函数组件需要强制刷新时

## API

```ts
const updator = useUpdate();
```

## 代码演示

<code src="let-hooks/useUpdate/demos/base.tsx"></code>

## 返回值

| 返回值  | 类型         | 描述     |
| ------- | ------------ | -------- |
| updator | `() => void` | 更新函数 |
