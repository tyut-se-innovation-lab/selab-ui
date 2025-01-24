import { CSSProperties, ShallowRef, StyleValue, shallowRef } from "vue";

export type ImgStyle = {
  styleValue: ShallowRef<CSSProperties>;
  setStyleValue: (key: string, value: string | number | StyleValue) => void;
  setStyleValues: (style: CSSProperties) => void;
  getStyleValue: (key: string) => string | number | StyleValue;
  deleteStyleValue: (key: string) => void;
};

export default function useImgStyleValue(): ImgStyle {
  const styleValue = shallowRef<CSSProperties>({});
  function setStyleValue(key: string, value: string | number | StyleValue) {
    styleValue.value = {
      ...styleValue.value,
      [key]: value,
    };
  }
  function setStyleValues(style: CSSProperties) {
    styleValue.value = {
      ...styleValue.value,
      ...style,
    };
  }
  function getStyleValue(key: string) {
    return styleValue.value[key as keyof CSSProperties] || "";
  }
  function deleteStyleValue(key: string) {
    const _imgStyleValue = styleValue.value;
    delete _imgStyleValue[key as keyof CSSProperties];
    styleValue.value = _imgStyleValue;
  }
  return {
    styleValue,
    setStyleValue,
    setStyleValues,
    getStyleValue,
    deleteStyleValue,
  };
}
