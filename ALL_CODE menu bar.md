# Nested menu bar: all code in one file

Each section below is one file. Create it at the path shown.


## `package.json`

````json
{
  "name": "nested-menubar",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@base-ui/react": "^1.8.0",
    "react": "^19.3.0",
    "react-dom": "^19.3.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^7.0.1",
    "@testing-library/react": "^16.3.3",
    "@testing-library/user-event": "^14.6.7",
    "@vitejs/plugin-react": "^6.1.1",
    "jsdom": "^30.1.0",
    "vite": "^8.3.0",
    "vitest": "^5.0.1"
  }
}
````


## `vite.config.js`

````js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
    css: false,
  },
});
````


## `index.html`

````html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Nested menu bar</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
````


## `public/menu.json`

````json
{
  "menus": [
    {
      "id": "file",
      "label": "File",
      "children": [
        { "id": "new", "label": "New", "action": "file.new", "shortcut": "Ctrl+N" },
        { "id": "open", "label": "Open…", "action": "file.open", "shortcut": "Ctrl+O" },
        {
          "id": "export",
          "label": "Export as",
          "children": [
            { "id": "pdf", "label": "PDF", "action": "export.pdf" },
            {
              "id": "image",
              "label": "Image",
              "children": [
                { "id": "png", "label": "PNG", "action": "export.png" },
                { "id": "jpg", "label": "JPEG", "action": "export.jpg" },
                {
                  "id": "vector",
                  "label": "Vector",
                  "children": [
                    { "id": "svg", "label": "SVG", "action": "export.svg" },
                    {
                      "id": "legacy",
                      "label": "Legacy formats",
                      "children": [
                        { "id": "eps", "label": "EPS", "action": "export.eps" },
                        { "id": "wmf", "label": "WMF", "action": "export.wmf", "disabled": true }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        { "type": "separator" },
        { "id": "quit", "label": "Quit", "action": "app.quit" }
      ]
    },
    {
      "id": "view",
      "label": "View",
      "children": [
        { "id": "grid", "type": "checkbox", "label": "Show grid", "action": "view.grid", "checked": true },
        { "id": "rulers", "type": "checkbox", "label": "Show rulers", "action": "view.rulers" },
        { "type": "separator" },
        {
          "id": "zoom",
          "label": "Zoom",
          "children": [
            { "id": "zoom-in", "label": "Zoom in", "action": "view.zoomIn", "shortcut": "Ctrl+=" },
            { "id": "zoom-out", "label": "Zoom out", "action": "view.zoomOut", "shortcut": "Ctrl+-" }
          ]
        }
      ]
    },
    {
      "id": "help",
      "label": "Help",
      "children": [
        { "id": "docs", "label": "Documentation", "href": "https://base-ui.com/react/components/menubar", "external": true },
        { "id": "about", "label": "About", "action": "help.about" }
      ]
    }
  ]
}
````


## `src/main.jsx`

````jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './components/menubar/menubar.css';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
````


## `src/App.jsx`

````jsx
import { useCallback, useState } from 'react';
import { DynamicMenuBar } from './components/menubar';
const MENU_URL = '/menu.json';
export function App() {
  const [last, setLast] = useState(null);
  const handleIssues = useCallback((issues) => {
    console.warn('Menu payload had problems:', issues);
  }, []);
  return (
    // isolation keeps portaled popups above page content
    <div style={{ isolation: 'isolate', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <DynamicMenuBar
        aria-label="Main menu"
        source={MENU_URL}
        onAction={setLast}
        onIssues={handleIssues}
      />
      <p aria-live="polite" style={{ marginTop: 24 }}>
        {last
          ? `Last action: ${last.node.type === 'link' ? last.node.href : (last.node.action ?? last.node.label)}${last.checked === undefined ? '' : last.checked ? ' (on)' : ' (off)'} via ${last.path.join(' › ')}`
          : 'Choose an item from the menu.'}
      </p>
    </div>
  );
}
````


## `src/test/setup.js`

````js
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';
// Base UI skips enter/exit animation waits when this flag is set,
// so popups mount/unmount synchronously in tests.
globalThis.BASE_UI_ANIMATIONS_DISABLED = true;
// jsdom lacks ResizeObserver, which Floating UI uses for positioning.
class ResizeObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
globalThis.ResizeObserver ??= ResizeObserverStub;
afterEach(() => cleanup());
````


## `src/components/menubar/types.js`

````js
/**
 * Menu model (documentation only; there is no runtime code in this file).
 * These are the *normalized* shapes the UI renders. The raw server payload is
 * untrusted and goes through `normalizeMenuResponse`.
 *
 * @typedef {Object} ActionNode
 * @property {'item'} type
 * @property {string} id            Server id, or a path-based id ("0.2.1") when missing/duplicated.
 * @property {string} label
 * @property {string} [action]      Opaque key your handler can switch on, e.g. "file.save".
 * @property {string} [shortcut]    Display-only hint such as "Ctrl+S". Does not register a hotkey.
 * @property {boolean} [disabled]
 *
 * @typedef {Object} LinkNode
 * @property {'link'} type
 * @property {string} id
 * @property {string} label
 * @property {string} href
 * @property {boolean} [external]   Opens in a new tab with rel="noopener noreferrer".
 * @property {boolean} [disabled]
 *
 * @typedef {Object} CheckboxNode
 * @property {'checkbox'} type
 * @property {string} id
 * @property {string} label
 * @property {string} [action]
 * @property {boolean} [checked]
 * @property {boolean} [disabled]
 *
 * @typedef {Object} SeparatorNode
 * @property {'separator'} type
 * @property {string} id
 *
 * @typedef {Object} SubmenuNode
 * @property {'submenu'} type
 * @property {string} id
 * @property {string} label
 * @property {boolean} [disabled]
 * @property {MenuNode[]} children
 *
 * @typedef {ActionNode | LinkNode | CheckboxNode | SeparatorNode | SubmenuNode} MenuNode
 *
 * @typedef {Object} MenuActionEvent
 * @property {ActionNode | LinkNode | CheckboxNode} node
 * @property {string[]} path        Node ids from the top-level menu down to the activated node.
 * @property {boolean} [checked]    Only set for checkbox nodes: the new state.
 *
 * @typedef {(event: MenuActionEvent) => void} MenuActionHandler
 */

export {};
````


## `src/components/menubar/normalizeMenu.js`

````js
export const DEFAULT_MAX_DEPTH = 10;
export class MenuSchemaError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MenuSchemaError';
  }
}
const isRecord = (value) => typeof value === 'object' && value !== null && !Array.isArray(value);
const nonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;
const SAFE_PROTOCOLS = new Set(['http:', 'https:', 'mailto:', 'tel:']);
/** Allows relative URLs and http(s)/mailto/tel. Rejects javascript:, data:, etc. */
export function isSafeHref(href) {
  try {
    return SAFE_PROTOCOLS.has(new URL(href, 'http://relative.invalid').protocol);
  } catch {
    return false;
  }
}
function resolveId(raw, idPath, path, ctx) {
  const provided = raw.id;
  if (nonEmptyString(provided)) {
    if (!ctx.seenIds.has(provided)) {
      ctx.seenIds.add(provided);
      return provided;
    }
    ctx.issues.push({ path, message: `Duplicate id "${provided}"; using "${idPath}" instead.` });
  }
  const generated = ctx.seenIds.has(idPath) ? `${idPath}#${ctx.seenIds.size}` : idPath;
  ctx.seenIds.add(generated);
  return generated;
}
function inferType(raw) {
  if (typeof raw.type === 'string') return raw.type;
  if (Array.isArray(raw.children)) return 'submenu';
  if (typeof raw.href === 'string') return 'link';
  return 'item';
}
/** Removes leading, trailing and consecutive separators. */
function tidySeparators(nodes) {
  const out = [];
  for (const node of nodes) {
    if (
      node.type === 'separator' &&
      (out.length === 0 || out[out.length - 1]?.type === 'separator')
    )
      continue;
    out.push(node);
  }
  while (out[out.length - 1]?.type === 'separator') out.pop();
  return out;
}
function normalizeNode(raw, path, idPath, depth, ctx) {
  if (!isRecord(raw)) {
    ctx.issues.push({ path, message: 'Expected an object.' });
    return null;
  }
  const type = inferType(raw);
  if (type === 'separator') {
    return { type, id: resolveId(raw, idPath, path, ctx) };
  }
  if (!['item', 'link', 'checkbox', 'submenu'].includes(type)) {
    ctx.issues.push({ path, message: `Unknown type "${type}".` });
    return null;
  }
  if (!nonEmptyString(raw.label)) {
    ctx.issues.push({ path, message: 'Missing "label".' });
    return null;
  }
  const label = raw.label.trim();
  const disabled = raw.disabled === true ? true : undefined;
  if (type === 'submenu') {
    if (depth > ctx.maxDepth) {
      ctx.issues.push({ path, message: `Exceeds maxDepth (${ctx.maxDepth}); submenu dropped.` });
      return null;
    }
    if (!Array.isArray(raw.children)) {
      ctx.issues.push({ path, message: 'Submenu needs a "children" array.' });
      return null;
    }
    const id = resolveId(raw, idPath, path, ctx);
    const children = tidySeparators(
      raw.children
        .map((child, i) =>
          normalizeNode(child, `${path}.children[${i}]`, `${idPath}.${i}`, depth + 1, ctx),
        )
        .filter((node) => node !== null),
    );
    if (children.length === 0) {
      ctx.issues.push({ path, message: 'Submenu has no valid children; dropped.' });
      return null;
    }
    return { type, id, label, disabled, children };
  }
  const id = resolveId(raw, idPath, path, ctx);
  if (type === 'link') {
    if (!nonEmptyString(raw.href) || !isSafeHref(raw.href)) {
      ctx.issues.push({
        path,
        message: 'Link needs a safe "href" (http, https, mailto, tel or relative).',
      });
      return null;
    }
    return { type, id, label, href: raw.href, external: raw.external === true, disabled };
  }
  const action = nonEmptyString(raw.action) ? raw.action : undefined;
  if (type === 'checkbox') {
    return { type, id, label, action, checked: raw.checked === true, disabled };
  }
  return {
    type: 'item',
    id,
    label,
    action,
    shortcut: nonEmptyString(raw.shortcut) ? raw.shortcut : undefined,
    disabled,
  };
}
/**
 * Turns an untrusted JSON payload into a render-ready model.
 *
 * Accepts `[...menus]` or `{ menus: [...] }`. Top-level entries must be
 * submenus. Invalid nodes are dropped and reported in `issues`; only a
 * structurally unusable payload throws `MenuSchemaError`.
 */
export function normalizeMenuResponse(raw, options = {}) {
  const list = Array.isArray(raw)
    ? raw
    : isRecord(raw) && Array.isArray(raw.menus)
      ? raw.menus
      : null;
  if (!list) {
    throw new MenuSchemaError('Expected an array of menus or an object with a "menus" array.');
  }
  const ctx = {
    maxDepth: options.maxDepth ?? DEFAULT_MAX_DEPTH,
    issues: [],
    seenIds: new Set(),
  };
  const menus = [];
  list.forEach((entry, i) => {
    const path = `menus[${i}]`;
    const node = normalizeNode(entry, path, String(i), 1, ctx);
    if (!node) return;
    if (node.type !== 'submenu') {
      ctx.issues.push({ path, message: 'Top-level entries must be submenus (have "children").' });
      return;
    }
    menus.push(node);
  });
  return { menus, issues: ctx.issues };
}
````


## `src/components/menubar/useMenuConfig.js`

````js
import { useCallback, useEffect, useState } from 'react';
import { normalizeMenuResponse } from './normalizeMenu';
async function fetchJson(url, signal) {
  const response = await fetch(url, { signal, headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Menu request failed with status ${response.status}.`);
  }
  return response.json();
}
/**
 * Loads and normalizes menu JSON. Cancels in-flight requests on unmount or
 * when `source` changes. If `source` is a function, keep its identity stable
 * (module scope or `useCallback`) or it will refetch on every render.
 */
export function useMenuConfig(source, { maxDepth } = {}) {
  const [state, setState] = useState({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const reload = useCallback(() => setAttempt((n) => n + 1), []);
  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });
    (async () => {
      try {
        const raw =
          typeof source === 'string'
            ? await fetchJson(source, controller.signal)
            : await source(controller.signal);
        if (controller.signal.aborted) return;
        const { menus, issues } = normalizeMenuResponse(raw, { maxDepth });
        setState({ status: 'ready', menus, issues });
      } catch (err) {
        if (controller.signal.aborted) return;
        setState({ status: 'error', error: err instanceof Error ? err : new Error(String(err)) });
      }
    })();
    return () => controller.abort();
  }, [source, maxDepth, attempt]);
  return { ...state, reload };
}
````


## `src/components/menubar/icons.jsx`

````jsx
export function ChevronRightIcon(props) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 3.5 10.5 8 6 12.5" />
    </svg>
  );
}
export function CheckIcon(props) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="m3.5 8.5 3 3 6-7" />
    </svg>
  );
}
````


## `src/components/menubar/MenuLeaves.jsx`

````jsx
import { Menu } from '@base-ui/react/menu';
import { CheckIcon } from './icons';
export function ActionItem({ node, path, onAction }) {
  return (
    <Menu.Item
      className="mb-item"
      label={node.label}
      disabled={node.disabled}
      onClick={() => onAction?.({ node, path })}
    >
      <span className="mb-item__label">{node.label}</span>
      {node.shortcut ? <span className="mb-item__shortcut">{node.shortcut}</span> : null}
    </Menu.Item>
  );
}
export function LinkMenuItem({ node, path, onAction }) {
  return (
    <Menu.LinkItem
      className="mb-item"
      label={node.label}
      href={node.href}
      {...(node.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-disabled={node.disabled || undefined}
      data-disabled={node.disabled ? '' : undefined}
      onClick={(event) => {
        if (node.disabled) {
          event.preventDefault();
          return;
        }
        onAction?.({ node, path });
      }}
    >
      <span className="mb-item__label">{node.label}</span>
    </Menu.LinkItem>
  );
}
export function CheckboxMenuItem({ node, path, onAction }) {
  return (
    <Menu.CheckboxItem
      className="mb-item"
      label={node.label}
      defaultChecked={node.checked}
      disabled={node.disabled}
      onCheckedChange={(checked) => onAction?.({ node, path, checked })}
    >
      <Menu.CheckboxItemIndicator className="mb-item__indicator">
        <CheckIcon />
      </Menu.CheckboxItemIndicator>
      <span className="mb-item__label">{node.label}</span>
    </Menu.CheckboxItem>
  );
}
export function MenuDivider() {
  return <Menu.Separator className="mb-separator" />;
}
````


## `src/components/menubar/MenuTree.jsx`

````jsx
import { Menu } from '@base-ui/react/menu';
import { ChevronRightIcon } from './icons';
import { ActionItem, CheckboxMenuItem, LinkMenuItem, MenuDivider } from './MenuLeaves';
/*
 * MenuPanel and MenuEntry are mutually recursive, which is what gives the
 * menu unlimited depth: a submenu entry renders another MenuPanel.
 * They live in one file to avoid a circular import.
 */

/** Portal + positioner + popup for a list of nodes. `path` = ids of the ancestors. */
export function MenuPanel({ nodes, path, onAction, nested = false }) {
  const hasIndicators = nodes.some((node) => node.type === 'checkbox');
  return (
    <Menu.Portal>
      <Menu.Positioner
        className="mb-positioner"
        {...(nested ? { sideOffset: -4, alignOffset: -5 } : { align: 'start', sideOffset: 6 })}
      >
        <Menu.Popup className="mb-popup" data-indicators={hasIndicators ? '' : undefined}>
          {nodes.map((node) => (
            <MenuEntry key={node.id} node={node} path={[...path, node.id]} onAction={onAction} />
          ))}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  );
}
/** Renders one node. `path` = ids from the top-level menu down to and including `node`. */
export function MenuEntry({ node, path, onAction }) {
  switch (node.type) {
    case 'item':
      return <ActionItem node={node} path={path} onAction={onAction} />;
    case 'link':
      return <LinkMenuItem node={node} path={path} onAction={onAction} />;
    case 'checkbox':
      return <CheckboxMenuItem node={node} path={path} onAction={onAction} />;
    case 'separator':
      return <MenuDivider />;
    case 'submenu':
      return <SubmenuEntry node={node} path={path} onAction={onAction} />;
    default:
      return null;
  }
}
function SubmenuEntry({ node, path, onAction }) {
  return (
    <Menu.SubmenuRoot disabled={node.disabled}>
      <Menu.SubmenuTrigger className="mb-item mb-item--submenu" label={node.label}>
        <span className="mb-item__label">{node.label}</span>
        <ChevronRightIcon className="mb-item__chevron" />
      </Menu.SubmenuTrigger>
      <MenuPanel nodes={node.children} path={path} onAction={onAction} nested />
    </Menu.SubmenuRoot>
  );
}
````


## `src/components/menubar/MenuBar.jsx`

````jsx
import { Menu } from '@base-ui/react/menu';
import { Menubar } from '@base-ui/react/menubar';
import { MenuPanel } from './MenuTree';
/** Presentational menu bar. Renders any depth of nesting; does no fetching. */
export function MenuBar({ menus, onAction, className, orientation, ...aria }) {
  return (
    <Menubar
      className={className ? `mb-bar ${className}` : 'mb-bar'}
      orientation={orientation}
      {...aria}
    >
      {menus.map((menu) => (
        <Menu.Root key={menu.id} disabled={menu.disabled}>
          <Menu.Trigger className="mb-trigger">{menu.label}</Menu.Trigger>
          <MenuPanel nodes={menu.children} path={[menu.id]} onAction={onAction} />
        </Menu.Root>
      ))}
    </Menubar>
  );
}
````


## `src/components/menubar/DynamicMenuBar.jsx`

````jsx
import { useEffect } from 'react';
import { MenuBar } from './MenuBar';
import { useMenuConfig } from './useMenuConfig';
/** Fetches menu JSON, then renders `MenuBar`. Handles loading, error and retry. */
export function DynamicMenuBar({ source, maxDepth, onIssues, ...barProps }) {
  const config = useMenuConfig(source, { maxDepth });
  const issues = config.status === 'ready' ? config.issues : null;
  useEffect(() => {
    if (issues && issues.length > 0) onIssues?.(issues);
  }, [issues, onIssues]);
  if (config.status === 'loading') {
    return (
      <div className="mb-status" role="status">
        Loading menu…
      </div>
    );
  }
  if (config.status === 'error') {
    return (
      <div className="mb-status" role="alert">
        <span>Couldn’t load the menu.</span>
        <button type="button" className="mb-status__retry" onClick={config.reload}>
          Try again
        </button>
      </div>
    );
  }
  if (config.menus.length === 0) return null;
  return <MenuBar menus={config.menus} {...barProps} />;
}
````


## `src/components/menubar/index.js`

````js
export { DynamicMenuBar } from './DynamicMenuBar';
export { MenuBar } from './MenuBar';
export { MenuPanel, MenuEntry } from './MenuTree';
export { ActionItem, CheckboxMenuItem, LinkMenuItem, MenuDivider } from './MenuLeaves';
export { useMenuConfig } from './useMenuConfig';
export {
  normalizeMenuResponse,
  isSafeHref,
  MenuSchemaError,
  DEFAULT_MAX_DEPTH,
} from './normalizeMenu';
````


## `src/components/menubar/menubar.css`

````css
/*
 * Nested menu bar styles.
 * Typography is inherited from the host app on purpose. Retheme by overriding
 * the --mb-* variables on :root, a wrapper, or these selectors.
 * Popups render in a portal, so tokens are declared on the popup layer too.
 */

:where(.mb-bar, .mb-positioner, .mb-status) {
  --mb-bg: #ffffff;
  --mb-fg: #18212b;
  --mb-muted: #667085;
  --mb-border: #d6dce5;
  --mb-hover: #e9eef6;
  --mb-accent: #2452c9;
  --mb-radius: 6px;
  --mb-popup-radius: 8px;
  --mb-shadow: 0 1px 2px rgb(16 24 40 / 0.06), 0 8px 24px -4px rgb(16 24 40 / 0.16);
  --mb-z: 1000;
}

@media (prefers-color-scheme: dark) {
  :where(.mb-bar, .mb-positioner, .mb-status) {
    --mb-bg: #171c24;
    --mb-fg: #e7ebf1;
    --mb-muted: #8f9bad;
    --mb-border: #2b3340;
    --mb-hover: #242c38;
    --mb-accent: #7ea2ff;
    --mb-shadow: 0 1px 2px rgb(0 0 0 / 0.4), 0 10px 28px -4px rgb(0 0 0 / 0.55);
  }
}

/* Bar */

.mb-bar {
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  background: var(--mb-bg);
  color: var(--mb-fg);
  border: 1px solid var(--mb-border);
  border-radius: calc(var(--mb-radius) + 3px);
}

.mb-bar[aria-orientation='vertical'] {
  flex-direction: column;
}

.mb-trigger {
  appearance: none;
  border: 0;
  margin: 0;
  padding: 0 12px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  font: inherit;
  color: inherit;
  background: transparent;
  border-radius: var(--mb-radius);
  cursor: default;
  user-select: none;
}

.mb-trigger:hover,
.mb-trigger[data-popup-open],
.mb-trigger[data-highlighted] {
  background: var(--mb-hover);
}

.mb-trigger:focus-visible {
  outline: 2px solid var(--mb-accent);
  outline-offset: -2px;
}

.mb-trigger[data-disabled] {
  color: var(--mb-muted);
  opacity: 0.6;
}

/* Popups (root and every nested level) */

.mb-positioner {
  z-index: var(--mb-z);
  outline: 0;
}

.mb-popup {
  box-sizing: border-box;
  min-width: 200px;
  max-height: var(--available-height);
  overflow-y: auto;
  padding: 4px;
  background: var(--mb-bg);
  color: var(--mb-fg);
  border: 1px solid var(--mb-border);
  border-radius: var(--mb-popup-radius);
  box-shadow: var(--mb-shadow);
  outline: 0;
  transform-origin: var(--transform-origin);
  transition: opacity 110ms ease, transform 110ms ease;
}

.mb-popup[data-starting-style],
.mb-popup[data-ending-style] {
  opacity: 0;
  transform: scale(0.97);
}

/* Items */

.mb-item {
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 6px 10px;
  border-radius: 4px;
  color: inherit;
  font: inherit;
  text-decoration: none;
  cursor: default;
  user-select: none;
  outline: 0;
}

/* Reserve a gutter for check marks only in panels that contain checkboxes. */
.mb-popup[data-indicators] .mb-item {
  padding-inline-start: 30px;
}

.mb-item[data-highlighted],
.mb-item[data-popup-open] {
  background: var(--mb-hover);
}

.mb-item:focus-visible {
  outline: 2px solid var(--mb-accent);
  outline-offset: -2px;
}

.mb-item[data-disabled] {
  color: var(--mb-muted);
  opacity: 0.6;
  pointer-events: none;
}

.mb-item__label {
  flex: 1 1 auto;
  min-width: 0;
}

.mb-item__shortcut {
  flex: none;
  margin-inline-start: auto;
  color: var(--mb-muted);
  font-size: 0.85em;
}

.mb-item__chevron {
  flex: none;
  margin-inline-start: auto;
  color: var(--mb-muted);
}

.mb-item__indicator {
  position: absolute;
  inset-inline-start: 9px;
  top: 50%;
  display: inline-flex;
  transform: translateY(-50%);
  color: var(--mb-accent);
}

.mb-separator {
  height: 1px;
  margin: 4px 6px;
  background: var(--mb-border);
}

/* Loading / error */

.mb-status {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  min-height: 32px;
  padding: 0 12px;
  color: var(--mb-muted);
}

.mb-status[role='alert'] {
  color: var(--mb-fg);
}

.mb-status__retry {
  font: inherit;
  color: var(--mb-accent);
  background: none;
  border: 0;
  padding: 2px 4px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.mb-status__retry:focus-visible {
  outline: 2px solid var(--mb-accent);
}

@media (prefers-reduced-motion: reduce) {
  .mb-popup {
    transition: none;
  }
}
````


## `src/components/menubar/__tests__/fixtures.js`

````js
/** Raw (untrusted) payload as a server might send it. Mixes explicit and inferred types. */
export const rawMenus = [
  {
    id: 'file',
    label: 'File',
    children: [
      { id: 'new', label: 'New', action: 'file.new', shortcut: 'Ctrl+N' },
      {
        id: 'export',
        label: 'Export',
        children: [
          { id: 'pdf', label: 'PDF', action: 'export.pdf' },
          {
            id: 'image',
            label: 'Image',
            children: [
              { id: 'png', label: 'PNG', action: 'export.png' },
              {
                id: 'more',
                label: 'More formats',
                children: [{ id: 'webp', label: 'WebP', action: 'export.webp' }],
              },
            ],
          },
        ],
      },
      { type: 'separator' },
      { id: 'quit', label: 'Quit', action: 'app.quit', disabled: true },
    ],
  },
  {
    id: 'view',
    label: 'View',
    children: [
      { id: 'grid', type: 'checkbox', label: 'Show grid', action: 'view.grid', checked: true },
      { id: 'docs', label: 'Documentation', href: 'https://example.com/docs', external: true },
    ],
  },
];
/** Builds a chain of submenus `depth` levels deep (top-level menu = depth 1). */
export function chain(depth) {
  const leaf = { id: 'leaf', label: 'Leaf', action: 'leaf' };
  let node = { id: `level-${depth}`, label: `Level ${depth}`, children: [leaf] };
  for (let d = depth - 1; d >= 1; d--) {
    node = { id: `level-${d}`, label: `Level ${d}`, children: [node] };
  }
  return [node];
}
````


## `src/components/menubar/__tests__/normalizeMenu.test.js`

````js
import { describe, expect, it } from 'vitest';
import { isSafeHref, MenuSchemaError, normalizeMenuResponse } from '../normalizeMenu';
import { chain, rawMenus } from './fixtures';
const firstChildren = (menus) => menus[0]?.children ?? [];
describe('normalizeMenuResponse', () => {
  it('accepts a bare array or a { menus } envelope', () => {
    expect(normalizeMenuResponse(rawMenus).menus).toHaveLength(2);
    expect(normalizeMenuResponse({ menus: rawMenus }).menus).toHaveLength(2);
  });
  it('throws MenuSchemaError when the payload has no menu list', () => {
    expect(() => normalizeMenuResponse(null)).toThrow(MenuSchemaError);
    expect(() => normalizeMenuResponse({ items: [] })).toThrow(MenuSchemaError);
    expect(() => normalizeMenuResponse('nope')).toThrow(MenuSchemaError);
  });
  it('infers node types when "type" is omitted', () => {
    const { menus } = normalizeMenuResponse(rawMenus);
    const [newItem, exportMenu] = firstChildren(menus);
    expect(newItem?.type).toBe('item');
    expect(exportMenu?.type).toBe('submenu');
    expect(menus[1]?.children[1]?.type).toBe('link');
  });
  it('preserves arbitrary nesting depth and ids', () => {
    const { menus } = normalizeMenuResponse(rawMenus);
    const exportMenu = firstChildren(menus)[1];
    const image = exportMenu.children[1];
    const more = image.children[1];
    expect(more.children[0]).toMatchObject({ id: 'webp', label: 'WebP', action: 'export.webp' });
  });
  it('drops invalid nodes and reports them instead of throwing', () => {
    const { menus, issues } = normalizeMenuResponse([
      {
        label: 'Edit',
        children: [{ label: 'Undo' }, { label: '   ' }, { type: 'teleporter', label: 'Nope' }, 42],
      },
    ]);
    expect(firstChildren(menus)).toHaveLength(1);
    expect(issues.map((i) => i.path)).toEqual([
      'menus[0].children[1]',
      'menus[0].children[2]',
      'menus[0].children[3]',
    ]);
  });
  it('drops top-level entries that are not submenus', () => {
    const { menus, issues } = normalizeMenuResponse([{ label: 'Lonely' }, ...rawMenus]);
    expect(menus).toHaveLength(2);
    expect(issues[0]).toMatchObject({ path: 'menus[0]' });
  });
  it('drops submenus that end up with no valid children', () => {
    const { menus, issues } = normalizeMenuResponse([
      { label: 'Empty', children: [{ label: '' }] },
    ]);
    expect(menus).toEqual([]);
    expect(issues.length).toBeGreaterThan(0);
  });
  it('repairs duplicate ids so React keys stay unique', () => {
    const { menus, issues } = normalizeMenuResponse([
      {
        id: 'a',
        label: 'One',
        children: [
          { id: 'x', label: 'X' },
          { id: 'x', label: 'Y' },
        ],
      },
    ]);
    const ids = firstChildren(menus).map((n) => n.id);
    expect(new Set(ids).size).toBe(2);
    expect(issues.some((i) => i.message.includes('Duplicate id'))).toBe(true);
  });
  it('generates path-based ids when none are provided', () => {
    const { menus } = normalizeMenuResponse([{ label: 'File', children: [{ label: 'New' }] }]);
    expect(menus[0]?.id).toBe('0');
    expect(firstChildren(menus)[0]?.id).toBe('0.0');
  });
  it('removes leading, trailing and consecutive separators', () => {
    const { menus } = normalizeMenuResponse([
      {
        label: 'File',
        children: [
          { type: 'separator' },
          { label: 'A' },
          { type: 'separator' },
          { type: 'separator' },
          { label: 'B' },
          { type: 'separator' },
        ],
      },
    ]);
    expect(firstChildren(menus).map((n) => n.type)).toEqual(['item', 'separator', 'item']);
  });
  it('respects maxDepth', () => {
    expect(normalizeMenuResponse(chain(10)).menus).toHaveLength(1);
    const shallow = normalizeMenuResponse(chain(4), { maxDepth: 3 });
    expect(shallow.issues.some((i) => i.message.includes('maxDepth'))).toBe(true);
    // Level 4 is dropped, so level 3 is left with no children and is dropped too, and so on up.
    expect(shallow.menus).toEqual([]);
  });
  it('rejects unsafe link hrefs', () => {
    const { menus, issues } = normalizeMenuResponse([
      {
        label: 'Help',
        children: [
          { label: 'Bad', href: 'javascript:alert(1)' },
          { label: 'Good', href: '/docs' },
        ],
      },
    ]);
    expect(firstChildren(menus)).toHaveLength(1);
    expect(issues).toHaveLength(1);
  });
});
describe('isSafeHref', () => {
  it.each([
    '/docs',
    './x',
    '#top',
    '?q=1',
    'https://a.dev',
    'http://a.dev',
    'mailto:a@b.dev',
    'tel:+15551234',
  ])('allows %s', (href) => expect(isSafeHref(href)).toBe(true));
  it.each(['javascript:alert(1)', 'JaVaScRiPt:alert(1)', 'data:text/html,<b>x</b>', 'vbscript:x'])(
    'blocks %s',
    (href) => expect(isSafeHref(href)).toBe(false),
  );
});
````


## `src/components/menubar/__tests__/useMenuConfig.test.jsx`

````jsx
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { useMenuConfig } from '../useMenuConfig';
import { rawMenus } from './fixtures';
const okResponse = (body) =>
  Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(body) });
afterEach(() => vi.unstubAllGlobals());
describe('useMenuConfig', () => {
  it('starts loading, then exposes normalized menus from a URL', async () => {
    const fetchMock = vi.fn(() => okResponse(rawMenus));
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useMenuConfig('/api/menu'));
    expect(result.current.status).toBe('loading');
    await waitFor(() => expect(result.current.status).toBe('ready'));
    if (result.current.status !== 'ready') throw new Error('unreachable');
    expect(result.current.menus.map((m) => m.label)).toEqual(['File', 'View']);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/menu',
      expect.objectContaining({ signal: expect.any(AbortSignal) }),
    );
  });
  it('accepts a fetcher function', async () => {
    const source = vi.fn(async () => ({ menus: rawMenus }));
    const { result } = renderHook(() => useMenuConfig(source));
    await waitFor(() => expect(result.current.status).toBe('ready'));
    expect(source).toHaveBeenCalledTimes(1);
  });
  it('reports HTTP failures as an error state', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve({ ok: false, status: 503 })),
    );
    const { result } = renderHook(() => useMenuConfig('/api/menu'));
    await waitFor(() => expect(result.current.status).toBe('error'));
    if (result.current.status !== 'error') throw new Error('unreachable');
    expect(result.current.error.message).toContain('503');
  });
  it('reports malformed payloads as an error state', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => okResponse({ nope: true })),
    );
    const { result } = renderHook(() => useMenuConfig('/api/menu'));
    await waitFor(() => expect(result.current.status).toBe('error'));
  });
  it('refetches on reload()', async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce({ ok: false, status: 500 })
      .mockImplementationOnce(() => okResponse(rawMenus));
    vi.stubGlobal('fetch', fetchMock);
    const { result } = renderHook(() => useMenuConfig('/api/menu'));
    await waitFor(() => expect(result.current.status).toBe('error'));
    act(() => result.current.reload());
    await waitFor(() => expect(result.current.status).toBe('ready'));
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
  it('aborts the in-flight request on unmount', async () => {
    let captured;
    const source = (signal) => {
      captured = signal;
      return new Promise(() => {});
    };
    const { unmount } = renderHook(() => useMenuConfig(source));
    await waitFor(() => expect(captured).toBeDefined());
    unmount();
    expect(captured?.aborted).toBe(true);
  });
});
````


## `src/components/menubar/__tests__/MenuBar.test.jsx`

````jsx
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { MenuBar } from '../MenuBar';
import { normalizeMenuResponse } from '../normalizeMenu';
import { chain, rawMenus } from './fixtures';
function setup(raw = rawMenus) {
  const onAction = vi.fn();
  // Base UI disables pointer events on parent popups while the pointer travels
  // into a submenu (safe-polygon), so user-event's pointer-events check must be off.
  const user = userEvent.setup({ pointerEventsCheck: 0 });
  const { menus } = normalizeMenuResponse(raw);
  render(<MenuBar aria-label="Main menu" menus={menus} onAction={onAction} />);
  return { user, onAction };
}
describe('MenuBar', () => {
  it('renders one trigger per top-level menu inside a labelled menubar', () => {
    setup();
    const bar = screen.getByRole('menubar', { name: 'Main menu' });
    expect(
      within(bar)
        .getAllByRole('menuitem')
        .map((el) => el.textContent),
    ).toEqual(['File', 'View']);
  });
  it('opens a menu on click and shows its items', async () => {
    const { user } = setup();
    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    expect(await screen.findByRole('menuitem', { name: /New/ })).toBeInTheDocument();
    expect(screen.getByText('Ctrl+N')).toBeInTheDocument();
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
  it('opens a submenu on hover', async () => {
    const { user } = setup();
    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    await user.hover(await screen.findByRole('menuitem', { name: 'Export' }));
    expect(await screen.findByRole('menuitem', { name: 'PDF' })).toBeInTheDocument();
  });
  // Deep traversal uses the keyboard: jsdom reports every pointer at (0, 0), which
  // defeats Base UI's safe-polygon hover logic beyond the first submenu level.
  it('reaches the 5th level and reports the full id path on action', async () => {
    const { user, onAction } = setup();
    screen.getByRole('menuitem', { name: 'File' }).focus();
    await user.keyboard('{ArrowDown}'); // open File, focus "New"
    await user.keyboard('{ArrowDown}'); // "Export"
    await user.keyboard('{ArrowRight}'); // open Export, focus "PDF"
    await user.keyboard('{ArrowDown}'); // "Image"
    await user.keyboard('{ArrowRight}'); // open Image, focus "PNG"
    await user.keyboard('{ArrowDown}'); // "More formats"
    await user.keyboard('{ArrowRight}'); // open More formats, focus "WebP"
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'WebP' })).toHaveFocus());
    await user.keyboard('{Enter}');
    expect(onAction).toHaveBeenCalledTimes(1);
    expect(onAction.mock.calls[0]?.[0]).toMatchObject({
      path: ['file', 'export', 'image', 'more', 'webp'],
      node: { action: 'export.webp' },
    });
  });
  it('opens submenus from the keyboard', async () => {
    const { user } = setup();
    screen.getByRole('menuitem', { name: 'File' }).focus();
    await user.keyboard('{ArrowDown}');
    const exportItem = await screen.findByRole('menuitem', { name: 'Export' });
    await user.keyboard('{ArrowDown}'); // New -> Export (Export is the 2nd item)
    expect(exportItem).toHaveFocus();
    await user.keyboard('{ArrowRight}');
    expect(await screen.findByRole('menuitem', { name: 'PDF' })).toBeInTheDocument();
  });
  it('does not fire actions for disabled items', async () => {
    const { user, onAction } = setup();
    await user.click(screen.getByRole('menuitem', { name: 'File' }));
    const quit = await screen.findByRole('menuitem', { name: 'Quit' });
    expect(quit).toHaveAttribute('aria-disabled', 'true');
    await user.click(quit);
    expect(onAction).not.toHaveBeenCalled();
  });
  it('toggles checkbox items and reports the new state', async () => {
    const { user, onAction } = setup();
    await user.click(screen.getByRole('menuitem', { name: 'View' }));
    const grid = await screen.findByRole('menuitemcheckbox', { name: 'Show grid' });
    expect(grid).toHaveAttribute('aria-checked', 'true');
    await user.click(grid);
    expect(onAction.mock.calls[0]?.[0]).toMatchObject({ checked: false, path: ['view', 'grid'] });
  });
  it('renders links with safe external attributes', async () => {
    const { user } = setup();
    await user.click(screen.getByRole('menuitem', { name: 'View' }));
    const link = await screen.findByRole('menuitem', { name: 'Documentation' });
    expect(link).toHaveAttribute('href', 'https://example.com/docs');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
  it('renders a 10-level chain without special-casing depth', async () => {
    const { user, onAction } = setup(chain(10));
    screen.getByRole('menuitem', { name: 'Level 1' }).focus();
    await user.keyboard('{ArrowDown}'); // open Level 1, focus "Level 2"
    for (let level = 3; level <= 10; level++) {
      await user.keyboard('{ArrowRight}');
      await waitFor(() =>
        expect(screen.getByRole('menuitem', { name: `Level ${level}` })).toHaveFocus(),
      );
    }
    await user.keyboard('{ArrowRight}');
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Leaf' })).toHaveFocus());
    await user.keyboard('{Enter}');
    expect(onAction.mock.calls[0]?.[0].path).toHaveLength(11);
  });
});
````


## `src/components/menubar/__tests__/DynamicMenuBar.test.jsx`

````jsx
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { DynamicMenuBar } from '../DynamicMenuBar';
import { rawMenus } from './fixtures';
describe('DynamicMenuBar', () => {
  it('shows a loading status, then the menubar', async () => {
    const source = vi.fn(async () => rawMenus);
    render(<DynamicMenuBar aria-label="Main menu" source={source} />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading menu');
    expect(await screen.findByRole('menubar', { name: 'Main menu' })).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
  it('shows an alert with a working retry when loading fails', async () => {
    const user = userEvent.setup();
    const source = vi.fn().mockRejectedValueOnce(new Error('boom')).mockResolvedValueOnce(rawMenus);
    render(<DynamicMenuBar aria-label="Main menu" source={source} />);
    expect(await screen.findByRole('alert')).toHaveTextContent('Couldn’t load the menu.');
    await user.click(screen.getByRole('button', { name: 'Try again' }));
    expect(await screen.findByRole('menubar')).toBeInTheDocument();
    expect(source).toHaveBeenCalledTimes(2);
  });
  it('forwards dropped-node issues to onIssues', async () => {
    const onIssues = vi.fn();
    const source = async () => [...rawMenus, { label: 'Broken', children: [{ label: '' }] }];
    render(<DynamicMenuBar aria-label="Main menu" source={source} onIssues={onIssues} />);
    await screen.findByRole('menubar');
    expect(onIssues).toHaveBeenCalledTimes(1);
    expect(onIssues.mock.calls[0]?.[0][0]).toMatchObject({ path: 'menus[2].children[0]' });
  });
  it('renders nothing when every menu is invalid', async () => {
    const source = async () => [{ label: 'Nothing' }];
    const { container } = render(<DynamicMenuBar aria-label="Main menu" source={source} />);
    await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());
    expect(container).toBeEmptyDOMElement();
  });
});
````
