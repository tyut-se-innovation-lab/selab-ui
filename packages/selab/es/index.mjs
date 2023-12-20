import * as o from "./src/index.mjs";
import { Button as c } from "./src/button/index.mjs";
import { card as s } from "./src/card/index.mjs";
const r = {
  install: (n) => {
    for (const t in o)
      if (Object.prototype.hasOwnProperty.call(o, t)) {
        const e = o[t];
        n.use(e);
      }
  }
};
export {
  c as Button,
  s as card,
  r as default
};
