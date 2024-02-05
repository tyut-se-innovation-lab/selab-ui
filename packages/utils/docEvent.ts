const eventMap = new Map();

const eventTypeList = [
    'click',
    'mousedown',
    'mouseup',
    'mousemove',
    'mouseover',
    'mouseout',
    'mouseenter',
    'mouseleave',
    'keydown',
    'keyup',
    'keypress',
    'wheel',
    'scroll',
    'copy',
    'input',
    'change',
    'focus',
    'blur',
    'submit',
    'scroll',
    'resize',
    'load',
    'unload',
    'error'
];

const eventHandler: {
    [key: string]: (e: Event) => void;
} = {};

eventTypeList.forEach((eventType) => {
    eventMap.set(eventType, []);
    eventHandler[eventType] = (e) => {
        const eventList = eventMap.get(eventType);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        eventList.forEach((callback: (e: any) => void) => {
            callback(e);
        });
    };
});

function on(
    eventType: (typeof eventTypeList)[number],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (e: any) => void
) {
    if (eventMap.has(eventType)) {
        const eventList = eventMap.get(eventType);
        eventList.push(callback);
        if (eventList.length === 1) {
            document.addEventListener(eventType, eventHandler[eventType]);
        }
    } else {
        // 暂不支持的事件类型
        console.error('Document Event: Unsupported event type: ' + eventType);
    }
}

function off(
    eventType: (typeof eventTypeList)[number],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    callback: (e: any) => void
) {
    if (eventMap.has(eventType)) {
        const eventList = eventMap.get(eventType);
        const index = eventList.indexOf(callback);
        if (index !== -1) {
            eventList.splice(index, 1);
            if (eventList.length === 0) {
                document.removeEventListener(
                    eventType,
                    eventHandler[eventType]
                );
            }
        }
    }
}

export default {
    on,
    off
};
