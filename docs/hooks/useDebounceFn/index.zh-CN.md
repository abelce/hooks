---
description: useDebounceFn
group: Effect
---

# useDebounceFn

创建一个 debounced 函数，在延迟`wait`毫秒后，返回输入的的`value`

## 代码演示

<code src="let-hooks/useDebounceFn/demos/base.tsx" title="基本用法" description="多次点击，只有最后一次生效"></code>

## 参数

| 参数 ｜ 描述 | 类型           | 默认值                    |
| ------------ | -------------- | ------------------------- | --- |
| fn           | 防抖执行的回调 | `(...args: any[]) => any` | --  |
| wait         | 等待时间(毫秒) | `number`                  | 0   |
