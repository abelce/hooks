---
description: useScrollFn
group: Effect
toc: content
---

# useScrollFn

监听页面滚动的 hook

## 代码演示

<code src="let-hooks/useScrollFn/demos/base.tsx" title="基本用法" description="滚动获取滚动信息"></code>

## 参数

| 属性名 | 描述             | 类型                         | 默认值     | 是否必填 |
| ------ | ---------------- | ---------------------------- | ---------- | -------- |
| fn     | 滚动回调函数     | `(data: ScrollData) => void` | --         | 必填     |
| ref    | 滚动容器元素 ref | `RefObject<HTMLElement>`     | `document` | 非必填   |
