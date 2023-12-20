import { defineComponent as t, computed as c, resolveComponent as a, openBlock as l, createBlock as p, normalizeClass as d, unref as u, withCtx as m, renderSlot as _ } from "vue";
import "./style/index.css";
const f = t({ name: "se-card" }), h = /* @__PURE__ */ t({
  ...f,
  props: {
    type: null
  },
  setup(o) {
    const e = o, r = c(() => ({ ["se-card--" + e.type]: e.type }));
    return (n, i) => {
      const s = a("card", !0);
      return l(), p(s, {
        class: d(["se-card", u(r)])
      }, {
        default: m(() => [
          _(n.$slots, "default")
        ]),
        _: 3
      }, 8, ["class"]);
    };
  }
});
export {
  h as default
};
