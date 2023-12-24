import { defineComponent as n, computed as r, reactive as s, openBlock as i, createElementBlock as d, normalizeClass as p, renderSlot as f, createTextVNode as k } from "vue";
import "../../less/components/button/index.css";
const C = n({ name: "se-button" }), v = /* @__PURE__ */ n({
  ...C,
  props: {
    type: {},
    onClick: { type: Function }
  },
  setup(o) {
    const e = o, c = r(() => ({
      [`se-button--${e.type || "default"}`]: !0
    })), t = "Default Click Handler", l = s({ value: t }), a = () => {
      e.onClick ? (e.onClick(), l.value = "Default Click Handler") : l.value = t;
    };
    return (u, m) => (i(), d("button", {
      class: p(["se-button", c.value]),
      onClick: a
    }, [
      f(u.$slots, "default", {}, () => [
        k("Default Text")
      ])
    ], 2));
  }
});
export {
  v as default
};
