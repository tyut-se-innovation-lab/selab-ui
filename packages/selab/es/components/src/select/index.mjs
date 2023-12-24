import a from "./template/select.vue.mjs";
const s = (t) => (t.install = (n) => {
  const e = t.name;
  n.component(e, t);
}, t), o = s(a);
export {
  o as Select,
  o as default
};
