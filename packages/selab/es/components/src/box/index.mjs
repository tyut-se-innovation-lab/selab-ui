import a from "./template/box.mjs";
const e = (t) => (t.install = (n) => {
  const o = t.name;
  n.component(o, t);
}, t), l = e(a);
export {
  l as Box,
  l as default
};
