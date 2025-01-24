import { Ref, ref } from "vue";
import { ImgPreviewPropsType } from "../image.d";

export default function useGetPreviewStartLocation(
  props: ImgPreviewPropsType,
): {
  getPreviewStartLocation: (index: number) => void;
  rect: Ref<DOMRect>;
  fit: Ref<string>;
} {
  const rect = ref<DOMRect>({} as DOMRect);
  const fit = ref<string>("fill");
  const getPreviewStartLocation = (index: number) => {
    if ("mask" in props.instance) {
      if (!props.instance!.mask[index]) index = 0;
      rect.value = props.instance!.mask[index].getBoundingClientRect();
      fit.value = (
        props.instance!.mask[index].parentNode
          ?.childNodes[0] as HTMLImageElement
      ).classList[1]
        .split("-")
        .pop() as string;
    } else {
      rect.value = {
        width: props.instance!.location.width,
        height: props.instance!.location.height,
        left: props.instance!.location.x,
        top: props.instance!.location.y,
      } as DOMRect;
      fit.value = "fill";
    }
  };
  getPreviewStartLocation(props.index);
  return {
    getPreviewStartLocation,
    rect,
    fit,
  };
}
