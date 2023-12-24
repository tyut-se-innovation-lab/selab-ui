import * as o from "./src/index.mjs";
import { clickOutside as m } from "../utils/index.mjs";
import { Button as f } from "./src/button/index.mjs";
import { Box as s } from "./src/box/index.mjs";
import { Card as a } from "./src/card/index.mjs";
import { Select as u } from "./src/select/index.mjs";
import { Skeleton as y } from "./src/skeleton/index.mjs";
import { Tag as g } from "./src/tag/index.mjs";
const c = {
  install: (t) => {
    for (const e in o)
      if (Object.prototype.hasOwnProperty.call(o, e)) {
        const r = o[e];
        t.use(r), t.directive("click-outside", m);
      }
  }
};
export {
  s as Box,
  f as Button,
  a as Card,
  u as Select,
  y as Skeleton,
  g as Tag,
  c as default
};
