---
description: useEvent
group: Effect
toc: content
---

# useEvent

事件订阅

## 代码演示

<code src="let-hooks/useEvent/demos/base.tsx" title="基本用法" description="按下键盘获取对应的code"></code>

## 参数

| 属性名   | 描述           | 类型                   | 默认值 | 是否必填 |
| -------- | -------------- | ---------------------- | ------ | -------- | -------- | ------ |
| evetName | 事件名称       | `string`               | --     | 必填     |
| handler  | 事件回调       | `(event: any) => void` | --     | 必填     |
| target   | 监听的目标对象 | `null                  | T      | Window`  | `window` | 非必填 |
| options  | 额外的参数     | `any`                  | 非必填 |
