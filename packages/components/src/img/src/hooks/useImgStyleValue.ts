import { CSSProperties, ShallowRef, StyleValue, shallowRef } from 'vue';

export type ImgStyle = {
    setImgStyleValue: (
        key: string,
        value: string | number | StyleValue
    ) => void;
    setImgStyleValues: (style: CSSProperties) => void;
    getImgStyleValue: (key: string) => string | number | StyleValue;
    imgStyleValue: ShallowRef<CSSProperties>;
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
    return {
        setImgStyleValue,
        setImgStyleValues,
        getImgStyleValue,
        imgStyleValue
    };
}
