---
description: useCountdown
group: State
toc: content
---

# useCountdown

倒计时 hook

## API

```ts
const { isReady, leftTime, formatedResult } = useCountdown({
  targetTime,
  leftTime,
});
```

## 代码演示

<code src="let-hooks/useCountdown/demos/base.tsx" title="基本用法"></code>

## 参数

| <div style="width: 80px">属性名 </div> | 描述                                           | <div style="width: 80px">类型 </div> | 默认值                   | 是否必填 |
| -------------------------------------- | ---------------------------------------------- | ------------------------------------ | ------------------------ | -------- |
| targetTime                             | 倒计时结束的时间                               | `number`                             | 系统当前时间`Date.now()` | 非必填   |
| leftTime                               | 剩余时间，如果有值上面的`targetTime`参数将无效 | `number`                             | --                       | 非必填   |

`targetTime`和`leftTime`可以随时动态调整

## 返回值

| 属性名         | 类型                    | 描述             |
| -------------- | ----------------------- | ---------------- |
| isReady        | `boolean`               | 倒计时是否完成   |
| leftTime       | `number`                | 倒计时剩余时间   |
| formatedResult | `CountdownFormatResult` | 倒计时格式化对象 |

### formatedResult

| 属性名       | 类型     | 描述 |
| ------------ | -------- | ---- |
| days         | `number` | 天   |
| hours        | `number` | 小时 |
| minutes      | `number` | 分钟 |
| seconds      | `number` | 秒   |
| milliseconds | `number` | 毫秒 |
