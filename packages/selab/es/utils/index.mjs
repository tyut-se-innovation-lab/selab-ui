const o = {
  mounted(e, t) {
    function c(n) {
      if (e.contains(n.target))
        return !1;
      t.value && typeof t.value == "function" && t.value(n);
    }
    e.__click_outside__ = c, document.addEventListener("click", c);
  },
  beforeUnmount(e) {
    document.removeEventListener("click", e.__click_outside__), delete e.__click_outside__;
  }
};
export {
  o as clickOutside
};
