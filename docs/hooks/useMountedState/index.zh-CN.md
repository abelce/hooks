---
description: useMountedState
group: Lifecycle
toc: content
---

# useMountedState

判断组件是否挂载的 hook

## 代码演示

<code src="let-hooks/useMountedState/demos/base.tsx" title="基本用法" description="刷新组件时时间不变"></code>

## API

```ts
import { useMountedState } from 'let-hooks';
const isMounted = useMountedState();
```

## 返回值

| 属性名    | 类型            | 描述                |
| --------- | --------------- | ------------------- |
| isMounted | `() => boolean` | 返回`true`\/`false` |
