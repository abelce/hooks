---
description: useAsyncEffect
group: Effect
toc: content
---

# useAsyncEffect

在 useEffect 中使用异步函数

## 代码演示

<code src="let-hooks/useAsyncEffect/demos/base.tsx" title="基本用法" description="组件加载时发送异步请求"></code>

## 参数

| 属性名 | 描述     | 类型                                                          | 默认值 | 是否必填 |
| ------ | -------- | ------------------------------------------------------------- | ------ | -------- |
| effect | 异步请求 | `() => AsyncGenerator<unknown, any, unknown> \| Promise<any>` | --     | 必填     |
| deps   | 依赖     | `any[] \| undefined`                                          | --     | 非必填   |
