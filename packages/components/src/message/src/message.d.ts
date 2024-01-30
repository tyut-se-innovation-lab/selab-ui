import { VNode, ComponentInternalInstance } from 'vue';
import { CreateProps } from '@selab-ui/utils/type';
import { messageType, iconType } from './message.ts';

export type MessageType = (typeof messageType)[number] extends undefined ? 'info' : (typeof messageType)[number];

export type IconType = (typeof iconType)[number] extends undefined ? 'info' : (typeof iconType)[number];

// export type MessageMsg = string | VNode | VNode<any, any, any> | (() => VNode) | (() => VNode<any, any, any>);

// export type MessageMsg = string | VNode | VNode_2 | (() => VNode | VNode_2);

export type MessageMsg = string | VNode<any, any, any> | (() => VNode<any, any, any>);

export type MessageHandler = {
    close: () => void;
};

export type Message_Handler = {
    _close: () => void;
};

export type MessageOption = {
    message: MessageMsg;
    type?: MessageType;
    duration?: number;
    icon?: IconType;
    showClose?: boolean;
    group?: boolean;
    size?: 'default' | 'small' | 'large' | 'mini';
    beforeClose?: (close: () => void) => void;
    onCloseClick?: (instance: MessageContext) => void;
};

export type MessagePropsType = {
    id: string;
    message: MessageMsg;
    type: MessageType;
    duration: number;
    icon: IconType;
    showClose: boolean;
    group: boolean;
    size: 'default' | 'small' | 'large' | 'mini';
    repeatNum: number;
    zIndex: number;
    index: number;
    top: number;
    height: number;
    beforeClose: (close: () => void) => void;
    onCloseClick: (instance: MessageContext) => void;
    onClose: (id: string) => void;
    onDestroy: () => void;
};

// export type MessageProps = {
//     [key in keyof MessagePropsType]: {
//         type: any;
//         default: MessagePropsType[key];
//     }
// };

export type MessageProps = CreateProps<MessagePropsType>;

export type MessageContext = {
    id: string;
    vNode: VNode;
    handler: MessageHandler;
    _handler: Message_Handler;
    vm: ComponentInternalInstance;
    props: ComponentInternalInstance.props<MessagePropsType>
};

export type MessageOptionNoType = Omit<MessagePropsType, 'type'>;

export interface Message {
    (option: MessageOption | MessageMsg): MessageHandler;
    success: (option: MessageOptionNoType | MessageMsg) => MessageHandler;
    info: (option: MessageOptionNoType | MessageMsg) => MessageHandler;
    warning: (option: MessageOptionNoType | MessageMsg) => MessageHandler;
    danger: (option: MessageOptionNoType | MessageMsg) => MessageHandler;
    closeAll: () => void;
}
