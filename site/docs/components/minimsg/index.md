# Mini Message(微型消息)

这是 `MiniMsg` (微型消息)组件的文档。

## 基础用法

`MiniMsg`注册了一个全局方法 `$seMiniMsg`，也可以单独引入。

**从 `selab-ui` 引入**

```js
import { SeMiniMsg } from 'selab-ui';
```

`MiniMsg` 方法接受一个 `option对象` 作为其参数，通过设置其 `message` 属性设置文本内容。

<preview path="../../demos/miniMsg/miniMsg.vue" title="基本使用" description=" "></preview>

### Mini Message 参数

| 参数名   | 类型                                         | 默认值                   | 描述                   | 跳转 Demo             |
| :------- | :------------------------------------------- | :----------------------- | :--------------------- | :-------------------- |
| type     | 'info' \| 'success' \| 'danger' \| 'warning' | 'info'                   | 消息类型               | [基础用法](#基础用法) |
| message  | string                                       |                          | 消息内容               | [基础用法](#基础用法) |
| duration | number                                       | 1000(ms)                 | 持续时长               | [基础用法](#基础用法) |
| location | { x: string \| number; y: string \| number } | { x: '50%', y: '50%' }   | 显示位置(相对挂载位置) | [基础用法](#基础用法) |
| root     | HTMLElement                                  | Document.documentElement | 挂载节点               | [基础用法](#基础用法) |
