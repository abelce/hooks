---
description: useHistory
group: State
toc: content
---

# useHistory

获取 history 信息

## 代码演示

<code src="let-hooks/useHistory/demos/base.tsx" title="基本用法"></code>

## 用法

```ts
const { location, listen, replace, push, go } = useHistory();
```

## 返回值

| 属性名   | 类型                            | 描述                         |
| -------- | ------------------------------- | ---------------------------- |
| location | `Location`                      | [Location](#location) 数据   |
| listen   | `(fn: Listener): () => void`    | history 改变的回调           |
| replace  | `(to: To, state?: any) => void` | 修改路径（替换当前历史记录） |
| push     | `(to: To, state?: any) => void` | 修改路径                     |
| go       | `(delta: number) => void`       | 跳转到距离当前的第几个页面   |

### location

| 属性名   | 类型     | 描述         |
| -------- | -------- | ------------ |
| pathname | `string` | pathname     |
| hash     | `string` | pahashthname |
| search   | `string` | search       |
| state    | `any`    | state        |
