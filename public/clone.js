(() => {
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };
  var require_clone = __commonJS((exports, module) => {
    const toString = Object.prototype.toString;
    const hasOwn = Object.prototype.hasOwnProperty;
    function isArray(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toString.call(arr) === "[object Array]";
    }
    function isPlanObject(obj) {
      if (!obj || toString.call(obj) !== "[object Object]") {
        return false;
      }
      const hasConstructor = hasOwn.call(obj, "constructor");
      const hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasConstructor && !hasIsPrototypeOf) {
        return false;
      }
      let key;
      for (key in obj) {
      }
      return typeof key === "undefined" || hasOwn.call(obj, key);
    }
    function getProperty(obj, key) {
      return obj[key];
    }
    function setProperty(obj, options) {
      const o = obj;
      o[options.k] = options.v;
      return o;
    }
    function extend(...rest) {
      let target;
      let options;
      let i;
      let key;
      let targetVal;
      let copy;
      let isArr;
      let clone;
      let deep;
      const args = Array.prototype.slice.call(rest);
      const len = args.length;
      target = args[0];
      i = 1;
      deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = args[1];
        i = 2;
      }
      if (target === null && (!isPlanObject(target) || typeof target !== "function")) {
        target = {};
      }
      for (; i < len; ++i) {
        options = args[i];
        if (options !== null) {
          for (key in options) {
            if (hasOwn.call(options, key)) {
              targetVal = getProperty(target, key);
              copy = getProperty(options, key);
              if (target !== copy) {
                if (deep && copy && (isPlanObject(copy) || (isArr = isArray(copy)))) {
                  if (isArr) {
                    isArr = false;
                    clone = targetVal && isArray(targetVal) ? targetVal : [];
                  } else {
                    clone = targetVal && isPlanObject(targetVal) ? targetVal : {};
                  }
                  setProperty(target, {k: key, v: extend(deep, clone, copy)});
                } else if (copy !== void 0) {
                  setProperty(target, {k: key, v: copy});
                }
              }
            }
          }
        }
      }
      return target;
    }
    module.exports = extend;
  });
  require_clone();
})();
