import { CSSProperties, ShallowRef, StyleValue, shallowRef } from 'vue';

export type ImgStyle = {
    imgStyleValue: ShallowRef<CSSProperties>;
    setImgStyleValue: (
        key: string,
        value: string | number | StyleValue
    ) => void;
    setImgStyleValues: (style: CSSProperties) => void;
    getImgStyleValue: (key: string) => string | number | StyleValue;
    deleteImgStyleValue: (key: string) => void;
};

export default function useImgStyleValue(): ImgStyle {
    const imgStyleValue = shallowRef<CSSProperties>({});
    function setImgStyleValue(
        key: string,
        value: string | number | StyleValue
    ) {
        imgStyleValue.value = {
            ...imgStyleValue.value,
            [key]: value
        };
    }
    function setImgStyleValues(style: CSSProperties) {
        imgStyleValue.value = {
            ...imgStyleValue.value,
            ...style
        };
    }
    function getImgStyleValue(key: string) {
        return imgStyleValue.value[key as keyof CSSProperties] || '';
    }
    function deleteImgStyleValue(key: string) {
        const _imgStyleValue = imgStyleValue.value;
        delete _imgStyleValue[key as keyof CSSProperties];
        imgStyleValue.value = _imgStyleValue;
    }
    return {
        imgStyleValue,
        setImgStyleValue,
        setImgStyleValues,
        getImgStyleValue,
        deleteImgStyleValue
    };
}
