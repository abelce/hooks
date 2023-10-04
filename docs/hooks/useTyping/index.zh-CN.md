---
description: useTyping
group: Effect
toc: content
---

# useTyping

获取输入状态的 hook

## 代码演示

<code src="let-hooks/useTyping/demos/base.tsx" title="基本用法" description="输入时显示“输入中”状态"></code>

## API

```ts
const handler = useMemoizedFn(() => {});

useTyping(handler, _ref);
```

## 参数

| 属性名  | 描述         | 类型                             | 默认值 | 是否必填 |
| ------- | ------------ | -------------------------------- | ------ | -------- |
| handler | 键盘事件回调 | `(event: KeyboardEvent) => void` | ---    | 必填     |
| ref     | 目标元素     | `RefObject<HTMLElement>`         | ---    | 非必填   |
