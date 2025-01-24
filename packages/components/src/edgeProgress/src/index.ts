import { Directive } from "vue";
import { EdgeProgressArg } from "./edgeProgress";
import { argCheck, valueCheck } from "./method";
import "../../less/components/edgeProgress/index.less";

export default {
  mounted(
    el: HTMLElement,
    { value, arg }: { value: number; arg?: EdgeProgressArg },
  ) {
    // 判断是否已经设置了::before
    const _beforeStyle = getComputedStyle(el, "::before");
    if (_beforeStyle.content !== "none") {
      console.warn("Edge Progress > ::before has been set.", el);
      return;
    }
    const _elStyle = getComputedStyle(el);
    if (_elStyle.overflowX !== "hidden") {
      console.warn(
        "Edge Progress > overflow-x is not hidden. May overflow from the box when progress reaches 100%.",
        el,
      );
    }
    const { color, strokeWidth, position } = argCheck(arg);
    const _position = getComputedStyle(el).position;
    if (_position === "static") el.style.position = "relative";
    el.classList.add("se-edge-progress");
    el.style.setProperty(
      "--se-edge-progress-top",
      position === "top" ? "0" : "auto",
    );
    el.style.setProperty(
      "--se-edge-progress-bottom",
      position === "bottom" ? "0" : "auto",
    );
    el.style.setProperty(
      "--se-edge-progress-width",
      valueCheck(value, strokeWidth),
    );
    el.style.setProperty("--se-edge-progress-height", strokeWidth);
    el.style.setProperty("--se-edge-progress-color", color);
  },
  updated(
    el: HTMLElement,
    { value, arg }: { value: number; arg?: EdgeProgressArg },
  ) {
    const _elClassList = el.classList;
    if (!_elClassList.contains("se-edge-progress")) return;
    const { color, strokeWidth, position } = argCheck(arg);
    el.style.setProperty(
      "--se-edge-progress-top",
      position === "top" ? "0" : "auto",
    );
    el.style.setProperty(
      "--se-edge-progress-bottom",
      position === "bottom" ? "0" : "auto",
    );
    el.style.setProperty(
      "--se-edge-progress-width",
      valueCheck(value, strokeWidth),
    );
    el.style.setProperty("--se-edge-progress-height", strokeWidth);
    el.style.setProperty("--se-edge-progress-color", color);
  },
} as Directive;
