// Used as style-loader's `insert` function (CommonJS on purpose).
//
// style-loader calls register(styleElement) once per imported stylesheet,
// when the bundle loads.
//
//  - Default ("head" mode, containerId bundle): the element is appended to
//    document.head immediately - same as plain style-loader. No extra calls
//    are needed. attach() / cleanAllStyles() are optional helpers.
//
//  - Shadow mode (web component bundle): src/shadowMode.js switches the mode
//    BEFORE any stylesheet is imported. Elements are only collected, and
//    attach(shadowRoot) clones them into each shadow root.

const templates = []; // <style> elements created by style-loader
const shadowInstances = new Map(); // shadowRoot -> { elements, refCount }
let shadowMode = false;

function isHead(target) {
  return !target || target === document.head;
}

function register(styleElement) {
  templates.push(styleElement);
  if (!shadowMode) document.head.appendChild(styleElement);
}

register.useShadowMode = function useShadowMode() {
  shadowMode = true;
};

// Shadow root: REQUIRED in shadow mode. Clones the styles into `target`.
// document.head (or no argument): OPTIONAL, re-adds styles removed earlier.
// Returns an idempotent detach() function.
register.attach = function attach(target) {
  if (isHead(target)) {
    templates.forEach((el) => {
      if (!el.isConnected) document.head.appendChild(el);
    });
    return function noop() {};
  }

  let instance = shadowInstances.get(target);
  if (instance) {
    instance.refCount += 1;
  } else {
    const fragment = document.createDocumentFragment();
    const elements = templates.map((template) => {
      const el = template.cloneNode(true);
      fragment.appendChild(el);
      return el;
    });
    target.appendChild(fragment);
    instance = { elements, refCount: 1 };
    shadowInstances.set(target, instance);
  }

  let released = false;
  return function detach() {
    if (released) return;
    released = true;
    if (shadowInstances.get(target) !== instance) return; // already cleaned
    register.cleanCurrentInstanceStyles(target);
  };
};

// Shadow root: release one reference; styles go with the last one.
// document.head (or no argument): remove this bundle's styles from the head.
register.cleanCurrentInstanceStyles = function cleanCurrentInstanceStyles(
  target
) {
  if (isHead(target)) {
    templates.forEach((el) => el.remove());
    return;
  }
  const instance = shadowInstances.get(target);
  if (!instance) return;
  instance.refCount -= 1;
  if (instance.refCount > 0) return;
  instance.elements.forEach((el) => el.remove());
  shadowInstances.delete(target);
};

// Remove this bundle's styles everywhere (head and every shadow root).
register.cleanAllStyles = function cleanAllStyles() {
  templates.forEach((el) => el.remove());
  shadowInstances.forEach(({ elements }) => elements.forEach((el) => el.remove()));
  shadowInstances.clear();
};

module.exports = register;
