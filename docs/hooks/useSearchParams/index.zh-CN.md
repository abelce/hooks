---
description: useSearchParams
group: Effect
toc: content
---

# useSearchParams

获取当前页面 search 数据的 hook

## 代码演示

<code src="let-hooks/useSearchParams/demos/base.tsx"></code>

## API

```ts
const [searchParams, setSearchParams] = useSearchParams();
```

## 返回值

| 返回值          | 类型                 | 描述             |
| --------------- | -------------------- | ---------------- |
| searchParams    | `URLSearchParams`    | search 数据      |
| setSearchParams | `SetURLSearchParams` | 设置 search 数据 |
