import { PropType } from 'vue';
import {
    ImgPropsType,
    ImgProps,
    PreviewType,
    ImgPreviewProps,
    Instance,
    PreviewToolbarProps,
    TemporaryInstance
} from './image.d';

export const previewDefault: PreviewType = {
    src: '',
    modal: true,
    scaleStep: 0.5,
    minScale: 1,
    maxScale: 50,
    closeIcon: 'close',
    toolbar: {
        zoom: true,
        rotate: true,
        flip: true,
        reset: true,
        download: false,
        pagination: true,
        show: true
    },
    name: '',
    album: false,
    albumList: [],
    loop: true,
    animation: 'slide',
    closeOnClickModal: true,
    closeOnPressEscape: true,
    onError: () => {},
    onChange: (change) => change(),
    onOpen: (open) => open(),
    onClose: (close) => close()
};

export const imgDefault: ImgPropsType = {
    fit: 'cover',
    alt: '',
    height: 200,
    width: 200,
    src: '',
    lazy: false,
    rootClassName: '',
    contextmenu: false,
    onError: () => {},
    onLoad: () => {},
    preview: previewDefault
};

export const imgProps: ImgProps = {
    fit: {
        type: String as PropType<
            'none' | 'cover' | 'fill' | 'contain' | 'scale-down'
        >,
        default: imgDefault.fit
    },
    alt: {
        type: String,
        default: imgDefault.alt
    },
    height: {
        type: [String, Number],
        default: imgDefault.height
    },
    width: {
        type: [String, Number],
        default: imgDefault.width
    },
    src: {
        type: String,
        default: imgDefault.src,
        required: true
    },
    lazy: {
        type: Boolean,
        default: imgDefault.lazy
    },
    rootClassName: {
        type: String,
        default: imgDefault.rootClassName
    },
    contextmenu: {
        type: [Boolean, Object],
        default: imgDefault.contextmenu
    },
    onError: {
        type: Function as PropType<(e: Event) => void>,
        default: imgDefault.onError
    },
    onLoad: {
        type: Function as PropType<(e: Event) => void>,
        default: imgDefault.onLoad
    },
    preview: {
        type: [Boolean, Object] as PropType<boolean | Partial<PreviewType>>,
        default: imgDefault.preview
    }
};

export const imgPreviewProps: ImgPreviewProps = {
    src: {
        type: String,
        default: previewDefault.src
    },
    modal: {
        type: Boolean,
        default: previewDefault.modal
    },
    scaleStep: {
        type: Number,
        default: previewDefault.scaleStep
    },
    minScale: {
        type: Number,
        default: previewDefault.minScale
    },
    maxScale: {
        type: Number,
        default: previewDefault.maxScale
    },
    closeIcon: {
        type: String,
        default: previewDefault.closeIcon
    },
    toolbar: {
        type: Object as PropType<PreviewType['toolbar']>,
        default: previewDefault.toolbar
    },
    name: {
        type: String,
        default: previewDefault.name
    },
    album: {
        type: Boolean,
        default: previewDefault.album
    },
    albumList: {
        type: Array as PropType<string[]>,
        default: previewDefault.albumList
    },
    loop: {
        type: Boolean,
        default: previewDefault.loop
    },
    animation: {
        type: String as PropType<'none' | 'slide' | 'fade'>,
        default: previewDefault.animation
    },
    closeOnClickModal: {
        type: Boolean,
        default: previewDefault.closeOnClickModal
    },
    closeOnPressEscape: {
        type: Boolean,
        default: previewDefault.closeOnPressEscape
    },
    onError: {
        type: Function as PropType<(e: Event) => void>,
        default: previewDefault.onError
    },
    onChange: {
        type: Function as PropType<
            (change: () => void, index: number | false) => void
        >,
        default: previewDefault.onChange
    },
    onOpen: {
        type: Function as PropType<(open: () => void) => void>,
        default: previewDefault.onOpen
    },
    onClose: {
        type: Function as PropType<(close: () => void) => void>,
        default: previewDefault.onClose
    },
    index: {
        type: Number,
        default: 0
    },
    instance: {
        type: Object as PropType<Instance | TemporaryInstance>,
        default: {} as Instance | TemporaryInstance,
        required: true
    }
};

export const previewToolbarProps: PreviewToolbarProps = {
    show: {
        type: Boolean,
        default: previewDefault.toolbar.show
    },
    zoom: {
        type: Boolean,
        default: previewDefault.toolbar.zoom
    },
    rotate: {
        type: Boolean,
        default: previewDefault.toolbar.rotate
    },
    flip: {
        type: Boolean,
        default: previewDefault.toolbar.flip
    },
    reset: {
        type: Boolean,
        default: previewDefault.toolbar.reset
    },
    download: {
        type: [Boolean, Function] as PropType<false | (() => void)>,
        default: previewDefault.toolbar.download
    },
    pagination: {
        type: Boolean,
        default: previewDefault.toolbar.pagination
    },
    index: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    }
};
