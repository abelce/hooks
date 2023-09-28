---
description: useBeforeUnload
group: SideEffects
toc: content
---

# useBeforeUnload

当浏览器窗口关闭或者刷新时，询问用户是否真的要离开该页面

## 代码演示

<code src="let-hooks/useBeforeUnload/demos/base.tsx" title="基本用法" description="刷新或关闭当前页面询问用户是否真的离开"></code>

## 参数

| 属性名  | 描述         | 类型                       | 默认值 | 是否必填 |
| ------- | ------------ | -------------------------- | ------ | -------- |
| enabled | 是否询问用户 | `boolean \| () => boolean` | --     | 必填     |
| message | 提示文案     | `string`                   | --     | 非必填   |
