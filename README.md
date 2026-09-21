# Nested menu bar (Base UI + React, JavaScript)

A menu bar driven by JSON, with unlimited submenu depth, built on `@base-ui/react`.

## Run

```bash
npm install
npm run dev      # demo app, loads /menu.json
npm test         # 43 tests (Vitest + Testing Library)
npm run build
```

## Use

```jsx
import { DynamicMenuBar } from './components/menubar';
import './components/menubar/menubar.css';

<DynamicMenuBar
  aria-label="Main menu"
  source="/api/menu"            // or (signal) => fetchWithAuth(signal)
  onAction={(e) => run(e.node.action, e.path, e.checked)}
  onIssues={(issues) => logger.warn(issues)}
/>
```

Keep `onIssues` and any function `source` referentially stable (`useCallback` / module scope).

## JSON shape

Top level is an array of menus, or `{ "menus": [...] }`. Top-level entries need `children`.

| Node | Fields |
| --- | --- |
| item (default) | `label`, `action?`, `shortcut?`, `disabled?` |
| link (has `href`) | `label`, `href`, `external?`, `disabled?` |
| checkbox | `type: "checkbox"`, `label`, `action?`, `checked?`, `disabled?` |
| separator | `type: "separator"` |
| submenu (has `children`) | `label`, `children: []`, `disabled?` |

`id` is optional everywhere; missing or duplicate ids are replaced with path-based ids.
Invalid nodes are dropped and reported through `onIssues`, not thrown.
Unsafe `href`s (`javascript:`, `data:`) are rejected. Depth is capped by `maxDepth` (default 10).

## Files (src/components/menubar)

| File | Role |
| --- | --- |
| `types.js` | JSDoc typedefs for the menu model (docs only) |
| `normalizeMenu.js` | Validates untrusted JSON into the model (pure, no React) |
| `useMenuConfig.js` | Fetch + normalize + abort + reload |
| `MenuLeaves.jsx` | Item, link, checkbox, separator |
| `MenuTree.jsx` | Recursive `MenuPanel` / `MenuEntry` (the nth-level part) |
| `MenuBar.jsx` | Presentational bar, takes normalized `menus` |
| `DynamicMenuBar.jsx` | Loading, error and retry states around `MenuBar` |
| `menubar.css` | Themable via `--mb-*` variables, dark mode, reduced motion |
| `__tests__/` | Vitest suites |
