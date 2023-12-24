import { defineComponent as a, computed as n } from "vue";
import "../../less/components/card/index.css";
const d = a({
  // Set the component name
  name: "se-card",
  // Define the props
  props: {
    type: String
  },
  // Define the setup function
  setup(e, { slots: t }) {
    const r = n(() => e.type ? { ["se-card--" + e.type]: !0 } : {});
    return () => /* @__PURE__ */ React.createElement(
      "div",
      {
        class: `se-card ${r.value ? Object.keys(r.value).join(" ") : ""}`
      },
      t.default && t.default()
    );
  }
});
export {
  d as default
};
