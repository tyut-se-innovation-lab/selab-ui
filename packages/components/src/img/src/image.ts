import { PropType, Ref } from 'vue';
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
    closeIcon: 'mdi:close',
    toolbar: {
        zoom: true,
        rotate: true,
        flip: true,
        reset: true,
        pagination: true,
        show: true
    },
    name: '',
    isAlbum: false,
    albumList: [],
    loop: true,
    animation: 'slide',
    closeOnClickModal: true,
    closeOnPressEscape: true,
    onError: () => {},
    onSwitch: (done) => done(),
    onOpen: (done) => done(),
    onClose: (done) => done()
};

export const imgDefault: ImgPropsType = {
    fit: 'cover',
    alt: '',
    height: 200,
    width: 200,
    src: '',
    lazy: false,
    rootClassName: '',
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
    isAlbum: {
        type: Boolean,
        default: previewDefault.isAlbum
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
    onSwitch: {
        type: Function as PropType<
            (
                change: () => void,
                index: number | false | 'isFirst' | 'isLast' | 'itIs'
            ) => void
        >,
        default: previewDefault.onSwitch
    },
    onOpen: {
        type: Function as PropType<(done: () => void) => void>,
        default: previewDefault.onOpen
    },
    onClose: {
        type: Function as PropType<(done: () => void) => void>,
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
    pagination: {
        type: Boolean,
        default: previewDefault.toolbar.pagination
    },
    index: {
        type: Object as PropType<Ref<number>>,
        default: 0
    },
    total: {
        type: Number,
        default: 0
    }
};
