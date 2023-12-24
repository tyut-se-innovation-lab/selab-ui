import a from "./template/skeleton.vue.mjs";
const s = (n) => (n.install = (t) => {
  const e = n.name;
  t.component(e, n);
}, n), o = s(a);
export {
  o as Skeleton,
  o as default
};
