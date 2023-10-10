---
description: useMessage
group: Effect
toc: content
---

# useMessage

监听`message`事件的 hook

## 何时使用

需要通过` window.addEventListener('message', _listener, false)`来监听消息事使用

## 代码演示

<code src="let-hooks/useMessage/demos/base.tsx" title="基本用法" description="接受通过`postMessage`发送的最新时间"></code>

## API

```ts
const handlder = (event: MessageEvent) => {
  console.log(event);
};
useMessage(handlder);
```

## 返回值

| 返回值   | 类型                            | 描述     |
| -------- | ------------------------------- | -------- |
| handlder | `(event: MessageEvent) => void` | 回调函数 |
