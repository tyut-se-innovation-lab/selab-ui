import { CSSProperties, ShallowRef, StyleValue, shallowRef } from 'vue';

export type SetImgStyle = {
    setImgStyleValue: (
        key: string,
        value: string | number | StyleValue
    ) => void;
    setImgStyleValues: (style: CSSProperties) => void;
    imgStyleValue: ShallowRef<CSSProperties>;
};

export default function useImgStyleValue(): SetImgStyle {
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
    return {
        setImgStyleValue,
        setImgStyleValues,
        imgStyleValue
    };
}
