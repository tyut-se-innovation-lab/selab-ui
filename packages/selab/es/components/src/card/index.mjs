import r from "./template/card.mjs";
const e = (t) => (t.install = (n) => {
  const a = t.name;
  n.component(a, t);
}, t), l = e(r);
export {
  l as Card,
  l as default
};
