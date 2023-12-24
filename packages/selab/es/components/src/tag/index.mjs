import s from "./template/tag.vue.mjs";
const e = (n) => (n.install = (t) => {
  const a = n.name;
  t.component(a, n);
}, n), o = e(s);
export {
  o as Tag,
  o as default
};
