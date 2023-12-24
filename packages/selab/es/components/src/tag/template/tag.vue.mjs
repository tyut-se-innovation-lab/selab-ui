import { defineComponent as n, ref as k, useSlots as d, computed as g, openBlock as s, createElementBlock as o, normalizeClass as y, renderSlot as a, unref as C, Fragment as _, createTextVNode as b, createCommentVNode as h } from "vue";
import "../../less/components/tag/index.css";
const v = n({ name: "se-tag" }), I = /* @__PURE__ */ n({
  ...v,
  props: {
    type: {},
    closeable: { type: Boolean, default: !1 }
  },
  emits: ["close", "click"],
  setup(r, { emit: i }) {
    const l = k(!0), p = d(), c = i, e = r, m = () => {
      c("click");
    }, u = () => {
      e.closeable && (l.value = !1, c("close"));
    }, f = g(() => [
      e.type ? `se-tag--${e.type}` : "",
      l.value ? "" : "se-tag--hide"
    ]);
    return (t, B) => (s(), o("span", {
      class: y(["se-tag", f.value]),
      onClick: m
    }, [
      a(t.$slots, "default"),
      t.closeable ? (s(), o("span", {
        key: 0,
        class: "se-tag-close-icon",
        onClick: u
      }, [
        C(p).closeIcon ? a(t.$slots, "closeIcon", { key: 0 }) : (s(), o(_, { key: 1 }, [
          b(" x ")
        ], 64))
      ])) : h("", !0)
    ], 2));
  }
});
export {
  I as default
};
