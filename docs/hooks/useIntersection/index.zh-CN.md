---
description: useIntersection
group: Effect
toc: content
---

# useIntersection

在 useEffect 中使用异步函数

## 代码演示

<code src="let-hooks/useIntersection/demos/base.tsx" title="基本用法" description="组件加载时发送异步请求"></code>

## 参数

| 属性名 | 描述     | 类型                                                          | 默认值 | 是否必填 |
| ------ | -------- | ------------------------------------------------------------- | ------ | -------- |
| effect | 异步函数 | `() => AsyncGenerator<unknown, any, unknown> \| Promise<any>` | --     | 必填     |
| deps   | 依赖项   | `any[] \| undefined`                                          | --     | 非必填   |
