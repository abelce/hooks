---
description: useHash
group: Effect
toc: content
---

# useHash

获取设备电池信息

## 代码演示

<code src="let-hooks/useHash/demos/base.tsx" title="基本用法"></code>

## 用法

```ts
const [hash, setHash] = useHash();
```

## 返回值

| 属性名  | 类型                     | 描述        |
| ------- | ------------------------ | ----------- |
| hash    | `string`                 | 当前的 hash |
| setHash | `(hash: string) => void` | 修改 hash   |
