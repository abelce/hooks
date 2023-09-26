---
description: useSet
group: State
toc: content
---

# useSet

使用`Set`的 hook

## 代码演示

<code src="let-hooks/useSet/demos/base.tsx" title="基本用法"></code>

## 使用方法

```ts
import {useSet} from "let-hooks"

const [
    set,
    {
        add,
        set,
        delete,
        clear,
        setAll,
        has,
        reset,
    }
    ] = useMap([]);
```

## 参数

| 属性名    | 描述       | 类型          | 默认值 | 是否必填 |
| --------- | ---------- | ------------- | ------ | -------- |
| initValue | Set 初始值 | `Iterable<V>` | ---    | 非必填   |

## 返回值

| 属性名 | 类型                               | 描述                                          |
| ------ | ---------------------------------- | --------------------------------------------- |
| add    | `Set< V>`                          | 返回的 Set                                    |
| delete | `(value: V) => boolean`            | 删除数据                                      |
| clear  | `() => void`                       | 清除所有数据                                  |
| reset  | `() => void`                       | 重置 Set 为初始状态                           |
| setAll | `(newValue?: Iterable<V>) => void` | 设置 Set 的值为`newValue`，会覆盖以前的所有值 |
