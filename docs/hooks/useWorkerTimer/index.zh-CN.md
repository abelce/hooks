---
description: useWorkerTimer
group: Effect
toc: content
---

# useWorkerTimer

获取输入状态的 hook

## 代码演示

<code src="let-hooks/useWorkerTimer/demos/base.tsx" title="基本用法" description="输入时显示“输入中”状态"></code>

## API

```ts
const handler = useMemoizedFn(() => {});
const cancel = useWorkerTimer(handler, wait);
```

## 参数

| 属性名  | 描述         | 类型                             | 默认值 | 是否必填 |
| ------- | ------------ | -------------------------------- | ------ | -------- |
| handler | 键盘事件回调 | `() => void` | ---    | 必填     |
| wait     | 时间     | `number`         | 0    | 非必填   |


## 返回值

| 返回值  | 类型         | 描述     |
| ------- | ------------ | -------- |
| cancel | `() => void` | 取消定时器函数 |
