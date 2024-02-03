# Message(componentNameZh)

这是 `Message` (信息弹窗)组件的文档。
## 基础用法
**从 `selab-ui` 引入**
`Message` 注册了一个全局方法 `$SeMsg`，也可以单独引入。

```js
import { SeMsg } from 'selab-ui';
```
`SeMsg` 方法接受一个 `option对象` 作为其参数，可以通过设置其 `message` 属性设置文本内容，也可以传入一个 `VNode`，或一个返回值为 `VNode` 的函数。

当需要传入的属性只有 `message` 时，可以直接传入 `message`。

当使用 `VNode` 时，建议设置 `VNode` 高度固定，因为弹窗的高度是在渲染前计算的，不固定的高度会导致弹窗之间覆盖、icon错位。
<preview path="../../demos/message/messageBase.vue" title="基本使用" description=" "></preview>

## 不同样式
通过设置 `type` 的值，可以改变样式。有四种不同的样式。也可以通过调用 `seMag` 上的方法调用不同样式。 
<preview path="../../demos/message/messageType.vue" title="基本使用" description=" "></preview>

## 停留时常
通过设置 `duration` 可以设置消息的停留时常，默认为3000ms。当设置为 `0` 时，将不会自动消失。
<preview path="../../demos/message/messageDuration.vue" title="基本使用" description=" "></preview>

## 图标
通过设置 `icon` 属性，可以手动设置其前置图标，当传值为空字符串时，将不显示图标。目前只有四种图标，与样式对应，当没有传递 `icon` 属性时，属性将与样式对应。
<preview path="../../demos/message/messageIcon.vue" title="基本使用" description=" "></preview>

## 可关闭的消息
默认的 Message 不能手动关闭。 将属性 `showClose` 设置为 `true` 将会显示关闭按钮。
<preview path="../../demos/message/messageShowClose.vue" title="基本使用" description=" "></preview>

## 分组消息合并
当 `group` 不为 `false`， `message` 的值为 `string` 且相同或 `VNode` 且 `key` 相同，`type` `duration` `icon` `showClose` 的值相同，且未传入 `onCloseClick` `beforeClose` 时，消息会自动合并。
<preview path="../../demos/message/messageGroup.vue" title="基本使用" description=" "></preview>

## 尺寸
通过设置 `size` 属性，可以改变尺寸。有四种不同的尺寸。
<preview path="../../demos/message/messageSize.vue" title="基本使用" description=" "></preview>


<!-- ## Message的基础配置 -->

## Message 参数

| 参数名       | 类型                                           | 默认值 | 描述                             | 跳转 Demo |
| :----------- | :--------------------------------------------- | :-------- | :------------------------------- | :-------- |
| message      | `string \| VNode \| () => VNode`               | null      | 内容                             |[基础用法](#基础用法)|
| type         | `'success' \| 'warning' \| 'danger' \| 'info'` | 'info'    | 样式                             |[不同样式](#不同样式)|
| duration     | `number`                                       | 3000      | 停留时间(ms)                     |[停留时常](#停留时常)|
| icon         | `'success' \|'warning' \|'danger' \|'info'`    | 'info'    | 图标                             |[图标](#图标)|
| showClose    | `boolean`                                      | false     | 展示关闭按钮                     |[可关闭的消息](#可关闭的消息)|
| group        | `boolean`                                      | true      | 是否合并相同消息为一个群组       |[分组消息合并](#分组消息合并)|
| size         | `'mini' \| 'small' \| 'default' \| 'large'`    | 'default' | 是否合并相同消息为一个群组       |[尺寸](#尺寸)|
| beforeClose  | `(close) => void`                              | null      | 关闭前的回调，会拦截全部关闭行为 |           |
| onCloseClick | `() => void`                                   | null      | 用户点击关闭事件                 |           |


## Message实例方法
| 参数名 | 描述 | 类型 |
| ------ | ---- | --------- |
| close  | 关闭当前的 Message | `() => void` |

## Message静态方法
| 参数名 | 描述 | 类型 |
| ------ | ---- | --------- |
| closeAll  | 关闭当前全部 Message | `() => void` |

