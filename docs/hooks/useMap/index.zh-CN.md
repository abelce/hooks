---
description: useMap
group: State
toc: content
---

# useMap

使用`Map`的 hook

## 代码演示

<code src="let-hooks/useMap/demos/base.tsx" title="基本用法"></code>

## 使用方法

```ts
import {useMap} from "let-hooks"

const [
    map,
    {
        get,
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

| 属性名    | 描述       | 类型               | 默认值 | 是否必填 |
| --------- | ---------- | ------------------ | ------ | -------- |
| initValue | Map 初始值 | `Iterable<[K, V]>` | ---    | 非必填   |

## 返回值

| 属性名 | 类型                                                     | 描述                                          |
| ------ | -------------------------------------------------------- | --------------------------------------------- |
| map    | `Map<K, V>`                                              | 返回的 Map                                    |
| get    | `(key: K) => V \| undefined`                             | 获取数据                                      |
| set    | `(key: K, value: V) => void`                             | 设置数据                                      |
| delete | `(key: K) => boolean`                                    | 删除数据                                      |
| clear  | `() => void`                                             | 清除所有数据                                  |
| reset  | `() => void`                                             | 重置 Map 为初始状态                           |
| setAll | `(newValue?: Iterable<readonly [K, V]> \| null) => void` | 设置 Map 的值为`newValue`，会覆盖以前的所有值 |
