---
description: useLocation
group: State
toc: content
---

# useLocation

获取 location 信息

## 代码演示

<code src="let-hooks/useLocation/demos/base.tsx" title="基本用法"></code>

## 用法

```ts
const {
  pathname,
  hash,
  search,
  state，
} = useLocation();
```

## 返回值

| 属性名   | 类型     | 描述         |
| -------- | -------- | ------------ |
| pathname | `string` | pathname     |
| hash     | `string` | pahashthname |
| search   | `string` | search       |
| state    | `any`    | state        |
