---
description: useLRU
group: cache
toc: content
---

# useLRU

LRU 的 hook，LRU 用来缓存一定数量的数据，数量超过时淘汰最久未使用的

## 代码演示

<code src="let-hooks/useLRU/demos/base.tsx" title="基本用法"></code>

## 使用方法

```ts
import {useLRU} from "let-hooks"

const {
    maxSize,
    set,
    has,
    peek,
    get,
    delete,
    clear,
    keys,
    values,
    entries,
    pop,
} = useLRU(maxSize);
```

## 参数

| 属性名  | 描述         | 类型     | 默认值 | 是否必填 |
| ------- | ------------ | -------- | ------ | -------- |
| maxSize | 缓存最大数量 | `number` | 10     | 非必填   |

## 返回值

| 属性名  | 类型                         | 描述                                 |
| ------- | ---------------------------- | ------------------------------------ |
| maxSize | `number`                     | 缓存最大数量                         |
| set     | `(key: K, value: V) => void` | 设置数据                             |
| get     | `(key: K) => V \| undefined` | 获取数据，并且是设置为最近使用       |
| peek    | `(key: K) => V \| undefined` | 获取数据，但不会将数据设置为最近使用 |
| delete  | `(key: K) => boolean`        | 删除数据                             |
| clear   | `() => void`                 | 清除所有数据                         |
| pop     | `() =>  V \| undefined`      | 返回并删除最近最少使用的数据         |
| keys    | `() =>  K[]`                 | 返回所有数据的 key                   |
| values  | `() =>  V[]`                 | 返回所有数据的 value                 |
| entries | `() =>  Array<[K, V]>`       | 返回所有数据的 key-value             |
