---
description: useIntersection
group: Effect
toc: content
---

# useIntersection

在 useEffect 中使用异步函数

## 代码演示

<code src="let-hooks/useIntersection/demos/base.tsx" title="基本用法" description="滚动示例查看"></code>

## 参数

| 属性名  | 描述                       | 类型                       | 默认值 | 是否必填 |
| ------- | -------------------------- | -------------------------- | ------ | -------- |
| ref     | 目标元素 ref               | `RefObject<HTMLElement>`   | --     | 必填     |
| options | `IntersectionObserver`选项 | `IntersectionObserverInit` | --     | 非必填   |
