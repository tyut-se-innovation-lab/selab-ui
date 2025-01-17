// ../node_modules/.pnpm/@iconify+iconify@3.1.1/node_modules/@iconify/iconify/dist/iconify.mjs
var defaultIconDimensions = Object.freeze(
  {
    left: 0,
    top: 0,
    width: 16,
    height: 16
  }
);
var defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
var defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
var defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) {
    result.hFlip = true;
  }
  if (!obj1.vFlip !== !obj2.vFlip) {
    result.vFlip = true;
  }
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) {
    result.rotate = rotate;
  }
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) {
    if (key in defaultIconTransformations) {
      if (key in parent && !(key in result)) {
        result[key] = defaultIconTransformations[key];
      }
    } else if (key in child) {
      result[key] = child[key];
    } else if (key in parent) {
      result[key] = parent[key];
    }
  }
  return result;
}
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) {
      return resolved[name] = [];
    }
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) {
        resolved[name] = [parent].concat(value);
      }
    }
    return resolved[name];
  }
  (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
  return resolved;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse(name2) {
    currentProps = mergeIconData(
      icons[name2] || aliases[name2],
      currentProps
    );
  }
  parse(name);
  tree.forEach(parse);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback2) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") {
    return names;
  }
  if (data.not_found instanceof Array) {
    data.not_found.forEach((name) => {
      callback2(name, null);
      names.push(name);
    });
  }
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback2(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
var matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
var stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) {
      return null;
    }
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) {
    return null;
  }
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      // Allow provider without '@': "provider:prefix:name"
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
var validateIconName = (icon, allowSimpleName) => {
  if (!icon) {
    return false;
  }
  return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
};
var optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) {
    if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
      return false;
    }
  }
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) {
    return null;
  }
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
    return null;
  }
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
    return null;
  }
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
      icon,
      defaultExtendedIconProps
    )) {
      return null;
    }
  }
  return data;
}
var dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage2, data) {
  if (!quicklyValidateIconSet(data)) {
    return [];
  }
  return parseIconSet(data, (name, icon) => {
    if (icon) {
      storage2.icons[name] = icon;
    } else {
      storage2.missing.add(name);
    }
  });
}
function addIconToStorage(storage2, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage2.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
function listIcons(provider, prefix) {
  let allIcons = [];
  const providers = typeof provider === "string" ? [provider] : Object.keys(dataStorage);
  providers.forEach((provider2) => {
    const prefixes = typeof provider2 === "string" && typeof prefix === "string" ? [prefix] : Object.keys(dataStorage[provider2] || {});
    prefixes.forEach((prefix2) => {
      const storage2 = getStorage(provider2, prefix2);
      allIcons = allIcons.concat(
        Object.keys(storage2.icons).map(
          (name) => (provider2 !== "" ? "@" + provider2 + ":" : "") + prefix2 + ":" + name
        )
      );
    });
  });
  return allIcons;
}
var simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") {
    simpleNames = allow;
  }
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage2 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage2.icons[iconName] || (storage2.missing.has(iconName) ? null : void 0);
  }
}
function addIcon(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) {
    return false;
  }
  const storage2 = getStorage(icon.provider, icon.prefix);
  return addIconToStorage(storage2, icon.name, data);
}
function addCollection(data, provider) {
  if (typeof data !== "object") {
    return false;
  }
  if (typeof provider !== "string") {
    provider = data.provider || "";
  }
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (icon && addIcon(name, icon)) {
          added = true;
        }
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    provider,
    prefix,
    name: "a"
  })) {
    return false;
  }
  const storage2 = getStorage(provider, prefix);
  return !!addIconSet(storage2, data);
}
function iconExists(name) {
  return !!getIconData(name);
}
function getIcon(name) {
  const result = getIconData(name);
  return result ? {
    ...defaultIconProps,
    ...result
  } : null;
}
var defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
var defaultIconCustomisations = Object.freeze({
  // Dimensions
  ...defaultIconSizeCustomisations,
  // Transformations
  ...defaultIconTransformations
});
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize(size, ratio, precision) {
  if (ratio === 1) {
    return size;
  }
  precision = precision || 100;
  if (typeof size === "number") {
    return Math.ceil(size * ratio * precision) / precision;
  }
  if (typeof size !== "string") {
    return size;
  }
  const oldParts = size.split(unitsSplit);
  if (oldParts === null || !oldParts.length) {
    return size;
  }
  const newParts = [];
  let code = oldParts.shift();
  let isNumber = unitsTest.test(code);
  while (true) {
    if (isNumber) {
      const num = parseFloat(code);
      if (isNaN(num)) {
        newParts.push(code);
      } else {
        newParts.push(Math.ceil(num * ratio * precision) / precision);
      }
    } else {
      newParts.push(code);
    }
    code = oldParts.shift();
    if (code === void 0) {
      return newParts.join("");
    }
    isNumber = !isNumber;
  }
}
var isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) {
        rotation += 2;
      } else {
        transformations.push(
          "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
        );
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push(
        "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
      );
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) {
      rotation -= Math.floor(rotation / 4) * 4;
    }
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift(
          "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
      case 2:
        transformations.unshift(
          "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
        );
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift(
          "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
        );
        break;
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) {
      body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
    }
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) {
      attributes[prop] = value.toString();
    }
  };
  setAttr("width", width);
  setAttr("height", height);
  attributes.viewBox = box.left.toString() + " " + box.top.toString() + " " + boxWidth.toString() + " " + boxHeight.toString();
  return {
    attributes,
    body
  };
}
var regex = /\sid="(\S+)"/g;
var randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
var counter = 0;
function replaceIDs(body, prefix = randomPrefix) {
  const ids = [];
  let match;
  while (match = regex.exec(body)) {
    ids.push(match[1]);
  }
  if (!ids.length) {
    return body;
  }
  const suffix = "suffix" + (Math.random() * 16777216 | Date.now()).toString(16);
  ids.forEach((id) => {
    const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
    const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    body = body.replace(
      // Allowed characters before id: [#;"]
      // Allowed characters after id: [)"], .[a-z]
      new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
      "$1" + newID + suffix + "$3"
    );
  });
  body = body.replace(new RegExp(suffix, "g"), "");
  return body;
}
var browserStorageConfig = {
  local: true,
  session: true
};
var browserStorageEmptyItems = {
  local: /* @__PURE__ */ new Set(),
  session: /* @__PURE__ */ new Set()
};
var browserStorageStatus = false;
function setBrowserStorageStatus(status) {
  browserStorageStatus = status;
}
var browserCacheVersion = "iconify2";
var browserCachePrefix = "iconify";
var browserCacheCountKey = browserCachePrefix + "-count";
var browserCacheVersionKey = browserCachePrefix + "-version";
var browserStorageHour = 36e5;
var browserStorageCacheExpiration = 168;
function getStoredItem(func, key) {
  try {
    return func.getItem(key);
  } catch (err) {
  }
}
function setStoredItem(func, key, value) {
  try {
    func.setItem(key, value);
    return true;
  } catch (err) {
  }
}
function removeStoredItem(func, key) {
  try {
    func.removeItem(key);
  } catch (err) {
  }
}
function setBrowserStorageItemsCount(storage2, value) {
  return setStoredItem(storage2, browserCacheCountKey, value.toString());
}
function getBrowserStorageItemsCount(storage2) {
  return parseInt(getStoredItem(storage2, browserCacheCountKey)) || 0;
}
var _window = typeof window === "undefined" ? {} : window;
function getBrowserStorage(key) {
  const attr = key + "Storage";
  try {
    if (_window && _window[attr] && typeof _window[attr].length === "number") {
      return _window[attr];
    }
  } catch (err) {
  }
  browserStorageConfig[key] = false;
}
function iterateBrowserStorage(key, callback2) {
  const func = getBrowserStorage(key);
  if (!func) {
    return;
  }
  const version = getStoredItem(func, browserCacheVersionKey);
  if (version !== browserCacheVersion) {
    if (version) {
      const total2 = getBrowserStorageItemsCount(func);
      for (let i = 0; i < total2; i++) {
        removeStoredItem(func, browserCachePrefix + i.toString());
      }
    }
    setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
    setBrowserStorageItemsCount(func, 0);
    return;
  }
  const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
  const parseItem = (index) => {
    const name = browserCachePrefix + index.toString();
    const item = getStoredItem(func, name);
    if (typeof item !== "string") {
      return;
    }
    try {
      const data = JSON.parse(item);
      if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && // Valid item: run callback
      callback2(data, index)) {
        return true;
      }
    } catch (err) {
    }
    removeStoredItem(func, name);
  };
  let total = getBrowserStorageItemsCount(func);
  for (let i = total - 1; i >= 0; i--) {
    if (!parseItem(i)) {
      if (i === total - 1) {
        total--;
        setBrowserStorageItemsCount(func, total);
      } else {
        browserStorageEmptyItems[key].add(i);
      }
    }
  }
}
function initBrowserStorage() {
  if (browserStorageStatus) {
    return;
  }
  setBrowserStorageStatus(true);
  for (const key in browserStorageConfig) {
    iterateBrowserStorage(key, (item) => {
      const iconSet = item.data;
      const provider = item.provider;
      const prefix = iconSet.prefix;
      const storage2 = getStorage(
        provider,
        prefix
      );
      if (!addIconSet(storage2, iconSet).length) {
        return false;
      }
      const lastModified = iconSet.lastModified || -1;
      storage2.lastModifiedCached = storage2.lastModifiedCached ? Math.min(storage2.lastModifiedCached, lastModified) : lastModified;
      return true;
    });
  }
}
function toggleBrowserCache(storage2, value) {
  switch (storage2) {
    case "local":
    case "session":
      browserStorageConfig[storage2] = value;
      break;
    case "all":
      for (const key in browserStorageConfig) {
        browserStorageConfig[key] = value;
      }
      break;
  }
}
var storage = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage[provider] = item;
}
function getAPIModule(provider) {
  return storage[provider] || storage[""];
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") {
    resources = [source.resources];
  } else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) {
      return null;
    }
  }
  const result = {
    // API hosts
    resources,
    // Root path
    path: source.path || "/",
    // URL length limit
    maxURL: source.maxURL || 500,
    // Timeout before next host is used.
    rotate: source.rotate || 750,
    // Timeout before failing query.
    timeout: source.timeout || 5e3,
    // Randomise default API end point.
    random: source.random === true,
    // Start index
    index: source.index || 0,
    // Receive data after time out (used if time out kicks in first, then API module sends data anyway).
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
  return result;
}
var configStorage = /* @__PURE__ */ Object.create(null);
var fallBackAPISources = [
  "https://api.simplesvg.com",
  "https://api.unisvg.com"
];
var fallBackAPI = [];
while (fallBackAPISources.length > 0) {
  if (fallBackAPISources.length === 1) {
    fallBackAPI.push(fallBackAPISources.shift());
  } else {
    if (Math.random() > 0.5) {
      fallBackAPI.push(fallBackAPISources.shift());
    } else {
      fallBackAPI.push(fallBackAPISources.pop());
    }
  }
}
configStorage[""] = createAPIConfig({
  resources: ["https://api.iconify.design"].concat(fallBackAPI)
});
function addAPIProvider(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) {
    return false;
  }
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function listAPIProviders() {
  return Object.keys(configStorage);
}
var detectFetch = () => {
  let callback2;
  try {
    callback2 = fetch;
    if (typeof callback2 === "function") {
      return callback2;
    }
  } catch (err) {
  }
};
var fetchModule = detectFetch();
function setFetch(fetch2) {
  fetchModule = fetch2;
}
function getFetch() {
  return fetchModule;
}
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) {
    return 0;
  }
  let result;
  if (!config.maxURL) {
    result = 0;
  } else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      const host = item;
      maxHostLength = Math.max(maxHostLength, host.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
var prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) {
      return config.path;
    }
  }
  return "/";
}
var send = (host, params, callback2) => {
  if (!fetchModule) {
    callback2("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const icons = params.icons;
      const iconsList = icons.join(",");
      const urlParams = new URLSearchParams({
        icons: iconsList
      });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback2("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback2(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) {
          callback2("abort", data);
        } else {
          callback2("next", defaultError);
        }
      });
      return;
    }
    setTimeout(() => {
      callback2("success", data);
    });
  }).catch(() => {
    callback2("next", defaultError);
  });
};
var fetchAPIModule = {
  prepare,
  send
};
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage2 = /* @__PURE__ */ Object.create(null);
  icons.sort((a, b) => {
    if (a.provider !== b.provider) {
      return a.provider.localeCompare(b.provider);
    }
    if (a.prefix !== b.prefix) {
      return a.prefix.localeCompare(b.prefix);
    }
    return a.name.localeCompare(b.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
      return;
    }
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage2[provider] || (storage2[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage.icons) {
      list = result.loaded;
    } else if (prefix === "" || localStorage.missing.has(name)) {
      list = result.missing;
    } else {
      list = result.pending;
    }
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
function removeCallback(storages, id) {
  storages.forEach((storage2) => {
    const items = storage2.loaderCallbacks;
    if (items) {
      storage2.loaderCallbacks = items.filter((row) => row.id !== id);
    }
  });
}
function updateCallbacks(storage2) {
  if (!storage2.pendingCallbacksFlag) {
    storage2.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage2.pendingCallbacksFlag = false;
      const items = storage2.loaderCallbacks ? storage2.loaderCallbacks.slice(0) : [];
      if (!items.length) {
        return;
      }
      let hasPending = false;
      const provider = storage2.provider;
      const prefix = storage2.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) {
            return true;
          }
          const name = icon.name;
          if (storage2.icons[name]) {
            icons.loaded.push({
              provider,
              prefix,
              name
            });
          } else if (storage2.missing.has(name)) {
            icons.missing.push({
              provider,
              prefix,
              name
            });
          } else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) {
            removeCallback([storage2], item.id);
          }
          item.callback(
            icons.loaded.slice(0),
            icons.missing.slice(0),
            icons.pending.slice(0),
            item.abort
          );
        }
      });
    });
  }
}
var idCounter = 0;
function storeCallback(callback2, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) {
    return abort;
  }
  const item = {
    id,
    icons,
    callback: callback2,
    abort
  };
  pendingSources.forEach((storage2) => {
    (storage2.loaderCallbacks || (storage2.loaderCallbacks = [])).push(item);
  });
  return abort;
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames2) : item;
    if (icon) {
      result.push(icon);
    }
  });
  return result;
}
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else {
    resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  }
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") {
    doneCallbacks.push(done);
  }
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") {
      status = "aborted";
    }
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function subscribe(callback2, overwrite) {
    if (overwrite) {
      doneCallbacks = [];
    }
    if (typeof callback2 === "function") {
      doneCallbacks.push(callback2);
    }
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback2) => {
      callback2(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") {
        item.status = "aborted";
      }
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) {
          return;
        }
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) {
          failQuery();
        } else {
          execNext();
        }
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index = config.resources.indexOf(item.resource);
      if (index !== -1 && index !== config.index) {
        config.index = index;
      }
    }
    status = "completed";
    doneCallbacks.forEach((callback2) => {
      callback2(data);
    });
  }
  function execNext() {
    if (status !== "pending") {
      return;
    }
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(
      config,
      payload,
      queryCallback,
      (data, error) => {
        cleanup();
        if (doneCallback) {
          doneCallback(data, error);
        }
      }
    );
    queries.push(query2);
    return query2;
  }
  function find(callback2) {
    return queries.find((value) => {
      return callback2(value);
    }) || null;
  }
  const instance = {
    query,
    find,
    setIndex: (index) => {
      config.index = index;
    },
    getIndex: () => config.index,
    cleanup
  };
  return instance;
}
function emptyCallback$1() {
}
var redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) {
      return;
    }
    const redundancy = initRedundancy(config);
    const cachedReundancy = {
      config,
      redundancy
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback2) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback2(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) {
      redundancy = cached.redundancy;
    }
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) {
        send2 = api.send;
      }
    }
  }
  if (!redundancy || !send2) {
    callback2(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback2)().abort;
}
function updateLastModified(storage2, lastModified) {
  const lastValue = storage2.lastModifiedCached;
  if (
    // Matches or newer
    lastValue && lastValue >= lastModified
  ) {
    return lastValue === lastModified;
  }
  storage2.lastModifiedCached = lastModified;
  if (lastValue) {
    for (const key in browserStorageConfig) {
      iterateBrowserStorage(key, (item) => {
        const iconSet = item.data;
        return item.provider !== storage2.provider || iconSet.prefix !== storage2.prefix || iconSet.lastModified === lastModified;
      });
    }
  }
  return true;
}
function storeInBrowserStorage(storage2, data) {
  if (!browserStorageStatus) {
    initBrowserStorage();
  }
  function store(key) {
    let func;
    if (!browserStorageConfig[key] || !(func = getBrowserStorage(key))) {
      return;
    }
    const set = browserStorageEmptyItems[key];
    let index;
    if (set.size) {
      set.delete(index = Array.from(set).shift());
    } else {
      index = getBrowserStorageItemsCount(func);
      if (!setBrowserStorageItemsCount(func, index + 1)) {
        return;
      }
    }
    const item = {
      cached: Math.floor(Date.now() / browserStorageHour),
      provider: storage2.provider,
      data
    };
    return setStoredItem(
      func,
      browserCachePrefix + index.toString(),
      JSON.stringify(item)
    );
  }
  if (data.lastModified && !updateLastModified(storage2, data.lastModified)) {
    return;
  }
  if (!Object.keys(data.icons).length) {
    return;
  }
  if (data.not_found) {
    data = Object.assign({}, data);
    delete data.not_found;
  }
  if (!store("local")) {
    store("session");
  }
}
function emptyCallback() {
}
function loadedNewIcons(storage2) {
  if (!storage2.iconsLoaderFlag) {
    storage2.iconsLoaderFlag = true;
    setTimeout(() => {
      storage2.iconsLoaderFlag = false;
      updateCallbacks(storage2);
    });
  }
}
function loadNewIcons(storage2, icons) {
  if (!storage2.iconsToLoad) {
    storage2.iconsToLoad = icons;
  } else {
    storage2.iconsToLoad = storage2.iconsToLoad.concat(icons).sort();
  }
  if (!storage2.iconsQueueFlag) {
    storage2.iconsQueueFlag = true;
    setTimeout(() => {
      storage2.iconsQueueFlag = false;
      const { provider, prefix } = storage2;
      const icons2 = storage2.iconsToLoad;
      delete storage2.iconsToLoad;
      let api;
      if (!icons2 || !(api = getAPIModule(provider))) {
        return;
      }
      const params = api.prepare(provider, prefix, icons2);
      params.forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          if (typeof data !== "object") {
            item.icons.forEach((name) => {
              storage2.missing.add(name);
            });
          } else {
            try {
              const parsed = addIconSet(
                storage2,
                data
              );
              if (!parsed.length) {
                return;
              }
              const pending = storage2.pendingIcons;
              if (pending) {
                parsed.forEach((name) => {
                  pending.delete(name);
                });
              }
              storeInBrowserStorage(storage2, data);
            } catch (err) {
              console.error(err);
            }
          }
          loadedNewIcons(storage2);
        });
      });
    });
  }
}
var isPending = (icon) => {
  const storage2 = getStorage(
    icon.provider,
    icon.prefix
  );
  const pending = storage2.pendingIcons;
  return !!(pending && pending.has(icon.name));
};
var loadIcons = (icons, callback2) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback2) {
      setTimeout(() => {
        if (callCallback) {
          callback2(
            sortedIcons.loaded,
            sortedIcons.missing,
            sortedIcons.pending,
            emptyCallback
          );
        }
      });
    }
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix } = icon;
    if (prefix === lastPrefix && provider === lastProvider) {
      return;
    }
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push(getStorage(provider, prefix));
    const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
    if (!providerNewIcons[prefix]) {
      providerNewIcons[prefix] = [];
    }
  });
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix, name } = icon;
    const storage2 = getStorage(provider, prefix);
    const pendingQueue = storage2.pendingIcons || (storage2.pendingIcons = /* @__PURE__ */ new Set());
    if (!pendingQueue.has(name)) {
      pendingQueue.add(name);
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((storage2) => {
    const { provider, prefix } = storage2;
    if (newIcons[provider][prefix].length) {
      loadNewIcons(storage2, newIcons[provider][prefix]);
    }
  });
  return callback2 ? storeCallback(callback2, sortedIcons, sources) : emptyCallback;
};
var loadIcon = (icon) => {
  return new Promise((fulfill, reject) => {
    const iconObj = typeof icon === "string" ? stringToIcon(icon, true) : icon;
    if (!iconObj) {
      reject(icon);
      return;
    }
    loadIcons([iconObj || icon], (loaded) => {
      if (loaded.length && iconObj) {
        const data = getIconData(iconObj);
        if (data) {
          fulfill({
            ...defaultIconProps,
            ...data
          });
          return;
        }
      }
      reject(icon);
    });
  });
};
function mergeCustomisations(defaults, item) {
  const result = {
    ...defaults
  };
  for (const key in item) {
    const value = item[key];
    const valueType = typeof value;
    if (key in defaultIconSizeCustomisations) {
      if (value === null || value && (valueType === "string" || valueType === "number")) {
        result[key] = value;
      }
    } else if (valueType === typeof result[key]) {
      result[key] = key === "rotate" ? value % 4 : value;
    }
  }
  return result;
}
var defaultExtendedIconCustomisations = {
  ...defaultIconCustomisations,
  inline: false
};
var blockClass = "iconify";
var inlineClass = "iconify-inline";
var elementDataProperty = "iconifyData" + Date.now();
var nodes = [];
function findRootNode(node) {
  for (let i = 0; i < nodes.length; i++) {
    const item = nodes[i];
    const root = typeof item.node === "function" ? item.node() : item.node;
    if (root === node) {
      return item;
    }
  }
}
function addRootNode(root, autoRemove = false) {
  let node = findRootNode(root);
  if (node) {
    if (node.temporary) {
      node.temporary = autoRemove;
    }
    return node;
  }
  node = {
    node: root,
    temporary: autoRemove
  };
  nodes.push(node);
  return node;
}
function addBodyNode() {
  if (document.documentElement) {
    return addRootNode(document.documentElement);
  }
  nodes.push({
    node: () => {
      return document.documentElement;
    }
  });
}
function removeRootNode(root) {
  nodes = nodes.filter((node) => root !== node && root !== (typeof node.node === "function" ? node.node() : node.node));
}
function listRootNodes() {
  return nodes;
}
function onReady(callback2) {
  const doc = document;
  if (doc.readyState && doc.readyState !== "loading") {
    callback2();
  } else {
    doc.addEventListener("DOMContentLoaded", callback2);
  }
}
var callback = null;
var observerParams = {
  childList: true,
  subtree: true,
  attributes: true
};
function queueScan(node) {
  if (!node.observer) {
    return;
  }
  const observer = node.observer;
  if (!observer.pendingScan) {
    observer.pendingScan = setTimeout(() => {
      delete observer.pendingScan;
      if (callback) {
        callback(node);
      }
    });
  }
}
function checkMutations(node, mutations) {
  if (!node.observer) {
    return;
  }
  const observer = node.observer;
  if (!observer.pendingScan) {
    for (let i = 0; i < mutations.length; i++) {
      const item = mutations[i];
      if (
        // Check for added nodes
        item.addedNodes && item.addedNodes.length > 0 || // Check for icon or placeholder with modified attributes
        item.type === "attributes" && item.target[elementDataProperty] !== void 0
      ) {
        if (!observer.paused) {
          queueScan(node);
        }
        return;
      }
    }
  }
}
function continueObserving(node, root) {
  node.observer.instance.observe(root, observerParams);
}
function startObserver(node) {
  let observer = node.observer;
  if (observer && observer.instance) {
    return;
  }
  const root = typeof node.node === "function" ? node.node() : node.node;
  if (!root || !window) {
    return;
  }
  if (!observer) {
    observer = {
      paused: 0
    };
    node.observer = observer;
  }
  observer.instance = new window.MutationObserver(checkMutations.bind(null, node));
  continueObserving(node, root);
  if (!observer.paused) {
    queueScan(node);
  }
}
function startObservers() {
  listRootNodes().forEach(startObserver);
}
function stopObserver(node) {
  if (!node.observer) {
    return;
  }
  const observer = node.observer;
  if (observer.pendingScan) {
    clearTimeout(observer.pendingScan);
    delete observer.pendingScan;
  }
  if (observer.instance) {
    observer.instance.disconnect();
    delete observer.instance;
  }
}
function initObserver(cb) {
  const isRestart = callback !== null;
  if (callback !== cb) {
    callback = cb;
    if (isRestart) {
      listRootNodes().forEach(stopObserver);
    }
  }
  if (isRestart) {
    startObservers();
    return;
  }
  onReady(startObservers);
}
function pauseObservingNode(node) {
  (node ? [node] : listRootNodes()).forEach((node2) => {
    if (!node2.observer) {
      node2.observer = {
        paused: 1
      };
      return;
    }
    const observer = node2.observer;
    observer.paused++;
    if (observer.paused > 1 || !observer.instance) {
      return;
    }
    const instance = observer.instance;
    instance.disconnect();
  });
}
function pauseObserver(root) {
  if (root) {
    const node = findRootNode(root);
    if (node) {
      pauseObservingNode(node);
    }
  } else {
    pauseObservingNode();
  }
}
function resumeObservingNode(observer) {
  (observer ? [observer] : listRootNodes()).forEach((node) => {
    if (!node.observer) {
      startObserver(node);
      return;
    }
    const observer2 = node.observer;
    if (observer2.paused) {
      observer2.paused--;
      if (!observer2.paused) {
        const root = typeof node.node === "function" ? node.node() : node.node;
        if (!root) {
          return;
        } else if (observer2.instance) {
          continueObserving(node, root);
        } else {
          startObserver(node);
        }
      }
    }
  });
}
function resumeObserver(root) {
  if (root) {
    const node = findRootNode(root);
    if (node) {
      resumeObservingNode(node);
    }
  } else {
    resumeObservingNode();
  }
}
function observe(root, autoRemove = false) {
  const node = addRootNode(root, autoRemove);
  startObserver(node);
  return node;
}
function stopObserving(root) {
  const node = findRootNode(root);
  if (node) {
    stopObserver(node);
    removeRootNode(root);
  }
}
function propsChanged(props1, props2) {
  if (props1.name !== props2.name || props1.mode !== props2.mode) {
    return true;
  }
  const customisations1 = props1.customisations;
  const customisations2 = props2.customisations;
  for (const key in defaultExtendedIconCustomisations) {
    if (customisations1[key] !== customisations2[key]) {
      return true;
    }
  }
  return false;
}
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) {
      value2 += 4;
    }
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) {
        return 0;
      }
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
var separator = /[\s,]+/;
function flipFromString(custom, flip) {
  flip.split(separator).forEach((str) => {
    const value = str.trim();
    switch (value) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
        break;
    }
  });
}
var sizeAttributes = ["width", "height"];
var booleanAttributes = [
  "inline",
  "hFlip",
  "vFlip"
];
function getBooleanAttribute(value, key) {
  if (value === key || value === "true") {
    return true;
  }
  if (value === "" || value === "false") {
    return false;
  }
  return null;
}
function getElementProps(element) {
  const name = element.getAttribute("data-icon");
  const icon = typeof name === "string" && stringToIcon(name, true);
  if (!icon) {
    return null;
  }
  const customisations = {
    ...defaultExtendedIconCustomisations,
    inline: element.classList && element.classList.contains(inlineClass)
  };
  sizeAttributes.forEach((attr) => {
    const value = element.getAttribute("data-" + attr);
    if (value) {
      customisations[attr] = value;
    }
  });
  const rotation = element.getAttribute("data-rotate");
  if (typeof rotation === "string") {
    customisations.rotate = rotateFromString(rotation);
  }
  const flip = element.getAttribute("data-flip");
  if (typeof flip === "string") {
    flipFromString(customisations, flip);
  }
  booleanAttributes.forEach((attr) => {
    const key = "data-" + attr;
    const value = getBooleanAttribute(element.getAttribute(key), key);
    if (typeof value === "boolean") {
      customisations[attr] = value;
    }
  });
  const mode = element.getAttribute("data-mode");
  return {
    name,
    icon,
    customisations,
    mode
  };
}
var selector = "svg." + blockClass + ", i." + blockClass + ", span." + blockClass + ", i." + inlineClass + ", span." + inlineClass;
function scanRootNode(root) {
  const nodes2 = [];
  root.querySelectorAll(selector).forEach((node) => {
    const props = node[elementDataProperty] || node.tagName.toLowerCase() !== "svg" ? getElementProps(node) : null;
    if (props) {
      nodes2.push({
        node,
        props
      });
    }
  });
  return nodes2;
}
function iconToHTML(body, attributes) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes) {
    renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
  }
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
var policy;
function createPolicy() {
  try {
    policy = window.trustedTypes.createPolicy("iconify", {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      createHTML: (s) => s
    });
  } catch (err) {
    policy = null;
  }
}
function cleanUpInnerHTML(html) {
  if (policy === void 0) {
    createPolicy();
  }
  return policy ? policy.createHTML(html) : html;
}
function iconClasses(iconName) {
  const classesToAdd = /* @__PURE__ */ new Set(["iconify"]);
  ["provider", "prefix"].forEach((attr) => {
    if (iconName[attr]) {
      classesToAdd.add("iconify--" + iconName[attr]);
    }
  });
  return classesToAdd;
}
function applyClasses(svg, classes, previouslyAddedClasses, placeholder) {
  const svgClasses = svg.classList;
  if (placeholder) {
    const placeholderClasses = placeholder.classList;
    Array.from(placeholderClasses).forEach((item) => {
      svgClasses.add(item);
    });
  }
  const addedClasses = [];
  classes.forEach((item) => {
    if (!svgClasses.contains(item)) {
      svgClasses.add(item);
      addedClasses.push(item);
    } else if (previouslyAddedClasses.has(item)) {
      addedClasses.push(item);
    }
  });
  previouslyAddedClasses.forEach((item) => {
    if (!classes.has(item)) {
      svgClasses.remove(item);
    }
  });
  return addedClasses;
}
function applyStyle(svg, styles, previouslyAddedStyles) {
  const svgStyle = svg.style;
  (previouslyAddedStyles || []).forEach((prop) => {
    svgStyle.removeProperty(prop);
  });
  const appliedStyles = [];
  for (const prop in styles) {
    if (!svgStyle.getPropertyValue(prop)) {
      appliedStyles.push(prop);
      svgStyle.setProperty(prop, styles[prop]);
    }
  }
  return appliedStyles;
}
function renderInlineSVG(element, props, iconData) {
  let span;
  try {
    span = document.createElement("span");
  } catch (err) {
    return element;
  }
  const customisations = props.customisations;
  const renderData = iconToSVG(iconData, customisations);
  const oldData = element[elementDataProperty];
  const html = iconToHTML(replaceIDs(renderData.body), {
    "aria-hidden": "true",
    "role": "img",
    ...renderData.attributes
  });
  span.innerHTML = cleanUpInnerHTML(html);
  const svg = span.childNodes[0];
  const placeholderAttributes = element.attributes;
  for (let i = 0; i < placeholderAttributes.length; i++) {
    const item = placeholderAttributes.item(i);
    const name = item.name;
    if (name !== "class" && !svg.hasAttribute(name)) {
      svg.setAttribute(name, item.value);
    }
  }
  const classesToAdd = iconClasses(props.icon);
  const addedClasses = applyClasses(svg, classesToAdd, new Set(oldData && oldData.addedClasses), element);
  const addedStyles = applyStyle(svg, customisations.inline ? {
    "vertical-align": "-0.125em"
  } : {}, oldData && oldData.addedStyles);
  const newData = {
    ...props,
    status: "loaded",
    addedClasses,
    addedStyles
  };
  svg[elementDataProperty] = newData;
  if (element.parentNode) {
    element.parentNode.replaceChild(svg, element);
  }
  return svg;
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL(svg) {
  return 'url("' + svgToData(svg) + '")';
}
var commonProps = {
  display: "inline-block"
};
var monotoneProps = {
  "background-color": "currentColor"
};
var coloredProps = {
  "background-color": "transparent"
};
var propsToAdd = {
  image: "var(--svg)",
  repeat: "no-repeat",
  size: "100% 100%"
};
var propsToAddTo = {
  "-webkit-mask": monotoneProps,
  "mask": monotoneProps,
  "background": coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + "-" + prop] = propsToAdd[prop];
  }
}
function fixSize(value) {
  return value + (value.match(/^[-0-9.]+$/) ? "px" : "");
}
function renderBackground(element, props, iconData, useMask) {
  const customisations = props.customisations;
  const renderData = iconToSVG(iconData, customisations);
  const renderAttribs = renderData.attributes;
  const oldData = element[elementDataProperty];
  const html = iconToHTML(renderData.body, {
    ...renderAttribs,
    width: iconData.width + "",
    height: iconData.height + ""
  });
  const classesToAdd = iconClasses(props.icon);
  const addedClasses = applyClasses(element, classesToAdd, new Set(oldData && oldData.addedClasses));
  const url = svgToURL(html);
  const newStyles = {
    "--svg": url,
    "width": fixSize(renderAttribs.width),
    "height": fixSize(renderAttribs.height),
    ...commonProps,
    ...useMask ? monotoneProps : coloredProps
  };
  if (customisations.inline) {
    newStyles["vertical-align"] = "-0.125em";
  }
  const addedStyles = applyStyle(element, newStyles, oldData && oldData.addedStyles);
  const newData = {
    ...props,
    status: "loaded",
    addedClasses,
    addedStyles
  };
  element[elementDataProperty] = newData;
  return element;
}
var scanQueued = false;
function checkPendingIcons() {
  if (!scanQueued) {
    scanQueued = true;
    setTimeout(() => {
      if (scanQueued) {
        scanQueued = false;
        scanDOM();
      }
    });
  }
}
function scanDOM(rootNode, addTempNode = false) {
  const iconsToLoad = /* @__PURE__ */ Object.create(null);
  function getIcon2(icon, load) {
    const { provider, prefix, name } = icon;
    const storage2 = getStorage(provider, prefix);
    const storedIcon = storage2.icons[name];
    if (storedIcon) {
      return {
        status: "loaded",
        icon: storedIcon
      };
    }
    if (storage2.missing.has(name)) {
      return {
        status: "missing"
      };
    }
    if (load && !isPending(icon)) {
      const providerIconsToLoad = iconsToLoad[provider] || (iconsToLoad[provider] = /* @__PURE__ */ Object.create(null));
      const set = providerIconsToLoad[prefix] || (providerIconsToLoad[prefix] = /* @__PURE__ */ new Set());
      set.add(name);
    }
    return {
      status: "loading"
    };
  }
  (rootNode ? [rootNode] : listRootNodes()).forEach((observedNode) => {
    const root = typeof observedNode.node === "function" ? observedNode.node() : observedNode.node;
    if (!root || !root.querySelectorAll) {
      return;
    }
    let hasPlaceholders = false;
    let paused = false;
    function render(element, props, iconData) {
      if (!paused) {
        paused = true;
        pauseObservingNode(observedNode);
      }
      if (element.tagName.toUpperCase() !== "SVG") {
        const mode = props.mode;
        const isMask = mode === "mask" || (mode === "bg" ? false : mode === "style" ? iconData.body.indexOf("currentColor") !== -1 : null);
        if (typeof isMask === "boolean") {
          renderBackground(element, props, {
            ...defaultIconProps,
            ...iconData
          }, isMask);
          return;
        }
      }
      renderInlineSVG(element, props, iconData);
    }
    scanRootNode(root).forEach(({ node, props }) => {
      const oldData = node[elementDataProperty];
      if (!oldData) {
        const { status, icon } = getIcon2(props.icon, true);
        if (icon) {
          render(node, props, icon);
          return;
        }
        hasPlaceholders = hasPlaceholders || status === "loading";
        node[elementDataProperty] = {
          ...props,
          status
        };
        return;
      }
      let item;
      if (!propsChanged(oldData, props)) {
        const oldStatus = oldData.status;
        if (oldStatus !== "loading") {
          return;
        }
        item = getIcon2(props.icon, false);
        if (!item.icon) {
          oldData.status = item.status;
          return;
        }
      } else {
        item = getIcon2(props.icon, oldData.name !== props.name);
        if (!item.icon) {
          hasPlaceholders = hasPlaceholders || item.status === "loading";
          Object.assign(oldData, {
            ...props,
            status: item.status
          });
          return;
        }
      }
      render(node, props, item.icon);
    });
    if (observedNode.temporary && !hasPlaceholders) {
      stopObserving(root);
    } else if (addTempNode && hasPlaceholders) {
      observe(root, true);
    } else if (paused && observedNode.observer) {
      resumeObservingNode(observedNode);
    }
  });
  for (const provider in iconsToLoad) {
    const providerIconsToLoad = iconsToLoad[provider];
    for (const prefix in providerIconsToLoad) {
      const set = providerIconsToLoad[prefix];
      loadIcons(Array.from(set).map((name) => ({
        provider,
        prefix,
        name
      })), checkPendingIcons);
    }
  }
}
function scanElement(root) {
  const node = findRootNode(root);
  if (!node) {
    scanDOM({
      node: root,
      temporary: true
    }, true);
  } else {
    scanDOM(node);
  }
}
function generateIcon(name, customisations, returnString = false) {
  const iconData = getIconData(name);
  if (!iconData) {
    return null;
  }
  const iconName = stringToIcon(name);
  const changes = mergeCustomisations(defaultExtendedIconCustomisations, customisations || {});
  const result = renderInlineSVG(document.createElement("span"), {
    name,
    icon: iconName,
    customisations: changes
  }, iconData);
  return returnString ? result.outerHTML : result;
}
function getVersion() {
  return "3.1.1";
}
function renderSVG(name, customisations) {
  return generateIcon(name, customisations, false);
}
function renderHTML(name, customisations) {
  return generateIcon(name, customisations, true);
}
function renderIcon(name, customisations) {
  const iconData = getIconData(name);
  if (!iconData) {
    return null;
  }
  const changes = mergeCustomisations(defaultExtendedIconCustomisations, customisations || {});
  return iconToSVG(iconData, changes);
}
function scan(root) {
  if (root) {
    scanElement(root);
  } else {
    scanDOM();
  }
}
if (typeof document !== "undefined" && typeof window !== "undefined") {
  addBodyNode();
  const _window2 = window;
  if (_window2.IconifyPreload !== void 0) {
    const preload = _window2.IconifyPreload;
    const err = "Invalid IconifyPreload syntax.";
    if (typeof preload === "object" && preload !== null) {
      (preload instanceof Array ? preload : [preload]).forEach((item) => {
        try {
          if (
            // Check if item is an object and not null/array
            typeof item !== "object" || item === null || item instanceof Array || // Check for 'icons' and 'prefix'
            typeof item.icons !== "object" || typeof item.prefix !== "string" || // Add icon set
            !addCollection(item)
          ) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      });
    }
  }
  setTimeout(() => {
    initObserver(scanDOM);
    scanDOM();
  });
}
function enableCache(storage2, enable) {
  toggleBrowserCache(storage2, enable !== false);
}
function disableCache(storage2) {
  toggleBrowserCache(storage2, true);
}
setAPIModule("", fetchAPIModule);
if (typeof document !== "undefined" && typeof window !== "undefined") {
  initBrowserStorage();
  const _window2 = window;
  if (_window2.IconifyProviders !== void 0) {
    const providers = _window2.IconifyProviders;
    if (typeof providers === "object" && providers !== null) {
      for (const key in providers) {
        const err = "IconifyProviders[" + key + "] is invalid.";
        try {
          const value = providers[key];
          if (typeof value !== "object" || !value || value.resources === void 0) {
            continue;
          }
          if (!addAPIProvider(key, value)) {
            console.error(err);
          }
        } catch (e) {
          console.error(err);
        }
      }
    }
  }
}
var _api = {
  getAPIConfig,
  setAPIModule,
  sendAPIQuery,
  setFetch,
  getFetch,
  listAPIProviders
};
var Iconify = {
  // IconifyAPIInternalFunctions
  _api,
  // IconifyAPIFunctions
  addAPIProvider,
  loadIcons,
  loadIcon,
  // IconifyStorageFunctions
  iconExists,
  getIcon,
  listIcons,
  addIcon,
  addCollection,
  // IconifyBuilderFunctions
  replaceIDs,
  calculateSize,
  buildIcon: iconToSVG,
  // IconifyCommonFunctions
  getVersion,
  renderSVG,
  renderHTML,
  renderIcon,
  scan,
  observe,
  stopObserving,
  pauseObserver,
  resumeObserver,
  // IconifyBrowserCacheFunctions
  enableCache,
  disableCache
};
try {
  if (self.Iconify === void 0) {
    self.Iconify = Iconify;
  }
} catch (err) {
}
export {
  _api,
  addAPIProvider,
  addCollection,
  addIcon,
  iconToSVG as buildIcon,
  calculateSize,
  Iconify as default,
  disableCache,
  enableCache,
  getIcon,
  getVersion,
  iconExists,
  listIcons,
  loadIcon,
  loadIcons,
  observe,
  pauseObserver,
  renderHTML,
  renderIcon,
  renderSVG,
  replaceIDs,
  resumeObserver,
  scan,
  stopObserving
};
/*! Bundled license information:

@iconify/iconify/dist/iconify.mjs:
  (**
  * (c) Iconify
  *
  * For the full copyright and license information, please view the license.txt or license.gpl.txt
  * files at https://github.com/iconify/iconify
  *
  * Licensed under MIT.
  *
  * @license MIT
  * @version 3.1.1
  *)
*/
//# sourceMappingURL=@iconify_iconify.js.map
