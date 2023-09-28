---
description: useCookie
group: SideEffects
toc: content
---

# useCookie

在渲染完成后调用的生命周期 hook，只会执行一次。

## 代码演示

<code src="let-hooks/useCookie/demos/base.tsx" title="基本用法" description="刷新组件时时间不变"></code>

## 参数

| 属性名    | 描述          | 类型     | 默认值 | 是否必填 |
| --------- | ------------- | -------- | ------ | -------- |
| cookieKey | cookie 的 key | `string` | --     | 必填     |

## 返回值

| 属性名 | 类型                         | 描述            |
| ------ | ---------------------------- | --------------- |
| value  | `string \| undefined`        | `cookieKey`的值 |
| udpate | `(nextValue: string)=> void` | 更新数据        |
| delete | `()=> void`                  | 删除数据        |
