// Used as style-loader's `insert` function (CommonJS on purpose).
// Collects every <style> element instead of putting it in the DOM.
const styles = [];
let attachedToHead = false;

function register(styleElement) {
  styles.push(styleElement);
}

// containerId approach: call inside mount(), before root.render()
register.attachToHead = function attachToHead() {
  if (attachedToHead) return;
  styles.forEach((el) => document.head.appendChild(el));
  attachedToHead = true;
};

// Web component approach: call in connectedCallback(), before root.render()
register.attachToShadow = function attachToShadow(shadowRoot) {
  styles.forEach((el) => shadowRoot.appendChild(el.cloneNode(true)));
};

module.exports = register;
