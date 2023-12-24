import { defineComponent as n, openBlock as t, createElementBlock as a, createElementVNode as o, normalizeClass as d, normalizeStyle as s, createCommentVNode as l, Fragment as p, renderList as k } from "vue";
import "../../less/components/skeleton/index.css";
const v = { class: "se-skeleton" }, m = {
  key: 0,
  class: "skeleton-avatar"
}, h = {
  key: 0,
  class: "skeleton-avatar"
}, u = { class: "skeleton-paragraph" }, _ = n({ name: "se-skeleton" }), S = /* @__PURE__ */ n({
  ..._,
  props: {
    avatarShow: { type: Boolean, default: !0 },
    rows: { default: 3 },
    active: { type: Boolean, default: !1 },
    titleWidth: { default: "100%" }
  },
  setup(r) {
    const e = r;
    return (i, f) => (t(), a("div", v, [
      o("div", {
        class: d(["skeleton-container", i.active ? "skeleton-animation" : ""])
      }, [
        o("div", {
          class: "skeleton-header",
          style: s({
            marginBottom: e.avatarShow ? "0px" : "10px"
          })
        }, [
          e.avatarShow ? (t(), a("div", m)) : l("", !0),
          o("div", {
            class: "skeleton-title",
            style: s({
              "--skeleton-title-width": e.titleWidth
            })
          }, null, 4)
        ], 4),
        o("div", {
          class: "skeleton-content",
          style: s({
            marginTop: e.avatarShow ? "-10px" : "0px"
          })
        }, [
          e.avatarShow ? (t(), a("div", h)) : l("", !0),
          o("div", u, [
            (t(!0), a(p, null, k(e.rows, (c) => (t(), a("div", {
              class: "skeleton-paragraph-content",
              key: c
            }))), 128))
          ])
        ], 4)
      ], 2)
    ]));
  }
});
export {
  S as default
};
