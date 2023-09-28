---
description: usePlatform
group: Effect
toc: content
---

# usePlatform

判断操作系统、浏览器类型以及是否为移动端。

## 代码演示

<code src="let-hooks/usePlatform/demos/base.tsx" title="基本用法" description="当前浏览器信息"></code>

## 用法

```ts
const {
  isSafari,
  isIOS,
  isIPadOS,
  isAndroid,
  isMobile,
  isFirefox,
  isWebKit,
  isChrome,
  isOpera,
  isMac,
  isWindows,
} = usePlatform();
```

## 返回值

| 属性名    | 类型            | 描述               |
| --------- | --------------- | ------------------ |
| isSafari  | `() => boolean` | 是否为 Safari      |
| isIOS     | `() => boolean` | 是否为 IOS         |
| isIPadOS  | `() => boolean` | 是否为 IPad        |
| isAndroid | `() => boolean` | 是否为 Android     |
| isMobile  | `() => boolean` | 是否为移动端       |
| isFirefox | `() => boolean` | 是否为 Firefox     |
| isWebKit  | `() => boolean` | 是否为 WebKit 内核 |
| isChrome  | `() => boolean` | 是否为 Fchrome     |
| isOpera   | `() => boolean` | 是否为 Opera       |
| isMac     | `() => boolean` | 是否为 Mac         |
| isWindows | `() => boolean` | 是否为 Windows     |
