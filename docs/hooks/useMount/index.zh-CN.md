---
description: useMount
group: Effect
---

# useMount

在渲染完成后调用的生命周期 hook，只会执行一次。

## 代码演示

<code src="let-hooks/useMount/demos/base.tsx" title="基本用法" description="刷新组件时时间不变"></code>

## 参数

| 属性名 | 描述     | 类型        | 默认值 | 是否必填 |
| ------ | -------- | ----------- | ------ | -------- |
| fn     | 回调函数 | `()=> void` | --     | 必填     |
