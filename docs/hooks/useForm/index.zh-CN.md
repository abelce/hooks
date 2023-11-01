---
description: useForm
group: Effect
toc: content
---

# useForm

处理表单的 hook

## 代码演示

<code src="let-hooks/useForm/demos/base.tsx" title="基本用法"></code>
<code src="let-hooks/useForm/demos/customComponent.tsx" title="自定义组件" description="`register`的结果传递给自定义组件，组件接收对应的props即可"></code>

## 参数

| 属性名     | 描述     | 类型                         | 默认值 | 是否必填 |
| ---------- | -------- | ---------------------------- | ------ | -------- |
| name       | 表单名称 | `string`                     | ---    | 非必填   |
| initValues | 初始值   | `Record<string, StoreValue>` | ---    | 非必填   |
| disabled   | 禁用     | `boolean`                    | ---    | 非必填   |

## 返回值

| 属性名             | 类型                                                                                      | 描述                                                    |
| ------------------ | ----------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| name               | `string`                                                                                  | 表单名称                                                |
| errors             | `Record<string, string[]> \| null`                                                        | 错误信息                                                |
| isDirty            | `boolean`                                                                                 | 表单是否发生变化                                        |
| register           | `(name: string, options: FormFielOptions) => RegisterReturn`                              | 注册字段                                                |
| getFieldError      | `(name: string) => string[]`                                                              | 获取对应字段名的错误信息                                |
| getFieldsError     | `(nameList?: string[]) => FieldError[]`                                                   | 获取一组字段名的错误信息                                |
| validateFields     | `(nameList?: string[]) => Promise<Record<string, StoreValue>>`                            | 校验一组字段名的错误信息                                |
| isFieldValidating  | `(name: string) => boolean`                                                               | 检查对应字段是否在校验（字段的校验是异步进行的）        |
| isFieldsValidating | `(nameList?: string[]) => boolean`                                                        | 检查一组字段是否在校验中                                |
| getField           | `(name: string) => FieldInfo \| undefined`                                                | 获取字段信息                                            |
| getFields          | `(nameList?: string[]) => FieldInfo[]`                                                    | 获取一组字段信息                                        |
| resetFields        | `(nameList?: string[]) => void`                                                           | 重置字段                                                |
| setFieldsValue     | `(values: Record<string, StoreValue>) => void`                                            | 重置字段的值                                            |
| scrollField        | `(name: string) => void`                                                                  | 滚动到对应字段位置                                      |
| handleSubmit       | `(onFinish, onFinishFailed) => (event: FormEvent<HTMLFormElement>) => Promise<void>`      | 设置给表单的`onSubmit`方法，通过`type=submit`提交时触发 |
| submit             | `(callback?: (errors: any, values: Record<string, StoreValue>) => void) => Promise<void>` | 提交表单                                                |
