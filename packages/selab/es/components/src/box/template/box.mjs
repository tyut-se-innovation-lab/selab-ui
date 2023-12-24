import { defineComponent as n, computed as r } from "vue";
import "../../less/components/box/index.css";
const p = n({
  // 设置组件名
  name: "se-box",
  // 定义属性
  props: {
    type: String
  },
  // 定义模板
  setup(e, { slots: t }) {
    const o = r(() => e.type ? { ["se-box--" + e.type]: !0 } : {});
    return () => /* @__PURE__ */ React.createElement(
      "div",
      {
        class: `se-box ${o.value ? Object.keys(o.value).join(" ") : ""}`
      },
      t.default && t.default()
    );
  }
});
export {
  p as default
};
