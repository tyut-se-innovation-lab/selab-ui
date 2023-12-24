import { defineComponent as g, ref as u, computed as O, watchEffect as B, resolveDirective as $, withDirectives as p, openBlock as i, createElementBlock as r, createElementVNode as n, Fragment as _, renderList as m, toDisplayString as d, createCommentVNode as D, vShow as k, normalizeStyle as E, normalizeClass as I } from "vue";
import "../../less/components/select/index.css";
const z = { class: "se-select-wrapper" }, N = { class: "se-select-selection-tags" }, R = ["onClick"], T = { class: "se-select-selection-search" }, b = ["value"], F = { class: "se-select-dropdown" }, L = ["onClick"], P = g({ name: "se-select" }), A = /* @__PURE__ */ g({
  ...P,
  props: {
    placeholder: { default: "请输入内容" },
    options: {},
    multiple: { type: Boolean, default: !1 },
    autoClearSearchValue: { type: Boolean, default: !0 }
  },
  setup(C) {
    const l = C, s = u(""), f = O(() => l.multiple && s.value ? l.options.filter(
      (e) => e.value.includes(s.value)
    ) : l.options), c = u(!1), o = u(["a1", "b3"]), w = (e) => {
      s.value = e.target.value, c.value = s.value.length > 0;
    }, y = () => {
      console.log(55), c.value = !1;
    }, x = (e) => {
      if (!l.multiple) {
        c.value = !1, s.value = e.value;
        return;
      }
      l.autoClearSearchValue && (s.value = "");
      const t = o.value.indexOf(e.value);
      t > -1 ? o.value.splice(t, 1) : o.value.push(e.value);
    }, S = (e) => {
      o.value = o.value.filter((t) => t !== e);
    };
    B(() => {
    }), u(6);
    const h = u();
    return (e, t) => {
      const V = $("click-outside");
      return p((i(), r("div", {
        class: "se-select",
        onClick: t[1] || (t[1] = (a) => {
          var v;
          return (v = h.value) == null ? void 0 : v.focus();
        })
      }, [
        n("div", z, [
          l.multiple ? (i(!0), r(_, { key: 0 }, m(o.value, (a) => (i(), r("div", N, [
            n("span", null, d(a), 1),
            n("span", {
              class: "se-select-selection-tag-close",
              onClick: (v) => S(a)
            }, "x", 8, R)
          ]))), 256)) : D("", !0),
          n("div", T, [
            n("input", {
              ref_key: "inputRef",
              ref: h,
              class: "se-select-search-input",
              type: "text",
              onInput: w,
              value: s.value,
              onClick: t[0] || (t[0] = (a) => c.value = !0)
            }, null, 40, b)
          ]),
          p(n("div", { class: "se-select-selection-placeholder" }, d(l.placeholder), 513), [
            [
              k,
              s.value == "" && l.placeholder && o.value.length < 0
            ]
          ])
        ]),
        p(n("div", F, [
          n("div", {
            class: "se-select-dropdown-wrapper",
            style: E({ height: f.value.length * 32 + "px" })
          }, [
            (i(!0), r(_, null, m(f.value, (a) => (i(), r("div", {
              class: I([
                "se-select-dropdown-item",
                o.value.includes(a.value) ? "se-select-dropdown-item-selected" : ""
              ]),
              onClick: (v) => x(a)
            }, d(a.value), 11, L))), 256))
          ], 4)
        ], 512), [
          [k, c.value]
        ])
      ])), [
        [V, y]
      ]);
    };
  }
});
export {
  A as default
};
