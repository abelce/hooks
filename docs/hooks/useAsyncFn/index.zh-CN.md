---
description: useAsyncFn
group: Effect
toc: content
---

# useAsyncFn

返回异步函数，以及执行结果、状态以及错误信息

## 代码演示

<code src="let-hooks/useAsyncFn/demos/base.tsx" title="基本用法" description="倒计时3s"></code>

## API

```ts
const fn = async () => {
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 3000);
  });
};
const { run, loading, error, value } = useAsyncFn(fn, deps);
```

## 参数

| 属性名 | 描述     | 类型                             | 默认值 | 是否必填 |
| ------ | -------- | -------------------------------- | ------ | -------- |
| fn     | 异步函数 | `(...args: any) => Promise<any>` | --     | 必填     |
| deps   | 依赖     | `any[] \| undefined`             | --     | 非必填   |

## 返回值

| 属性名  | 类型                             | 描述             |
| ------- | -------------------------------- | ---------------- |
| run     | `(...args: any) => Promise<any>` | 执行异步函数     |
| loading | `boolean`                        | 执行状态         |
| error   | `Error`                          | 错误信息         |
| value   | `any`                            | 异步函数执行结果 |
