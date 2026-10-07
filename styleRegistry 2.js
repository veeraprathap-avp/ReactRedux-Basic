// Used as style-loader's `insert` function (CommonJS on purpose).
//
// style-loader calls register(styleElement) once per imported stylesheet,
// at script-load time. We keep those elements as pristine templates and
// never put them in the DOM. attach(target) clones them into a target
// (document.head or a shadow root), so every instance gets its own copy.

const templates = []; // <style> elements created by style-loader
const instances = new Map(); // target -> { elements, refCount }

function register(styleElement) {
  templates.push(styleElement);
}

// Attach all collected styles to `target`.
// Returns an idempotent detach() function for this caller.
register.attach = function attach(target = document.head) {
  let instance = instances.get(target);

  if (instance) {
    instance.refCount += 1; // e.g. two containerId mounts share document.head
  } else {
    const fragment = document.createDocumentFragment();
    const elements = templates.map((template) => {
      const el = template.cloneNode(true);
      fragment.appendChild(el);
      return el;
    });
    target.appendChild(fragment); // single DOM write, before React renders
    instance = { elements, refCount: 1 };
    instances.set(target, instance);
  }

  let released = false;
  return function detach() {
    if (released) return;
    released = true;
    // ignore if cleanAllStyles() ran or the target was re-attached since
    if (instances.get(target) !== instance) return;
    register.cleanCurrentInstanceStyles(target);
  };
};

// Release one reference to `target`; styles are removed with the last one.
register.cleanCurrentInstanceStyles = function cleanCurrentInstanceStyles(
  target = document.head
) {
  const instance = instances.get(target);
  if (!instance) return;
  instance.refCount -= 1;
  if (instance.refCount > 0) return;
  instance.elements.forEach((el) => el.remove());
  instances.delete(target);
};

// Remove styles from every target (e.g. before switching modes at runtime).
register.cleanAllStyles = function cleanAllStyles() {
  instances.forEach(({ elements }) => elements.forEach((el) => el.remove()));
  instances.clear();
};

module.exports = register;
