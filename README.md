# Line Monitor

A small Angular app that shows the live state of a production line, in this case a **bagging line**:
`Scale → Attacher → Packer → Closer`. Each machine is either running, in warning or in alarm.

- **Header:** logo, current date and time, and the logged-in operator (mocked for now).
- **Machine strip:** a compact status chip for every machine, shown on every page of the feature.
- **Overview page:** the line drawn as connected machine tiles, with the machine type icon and its status.

The machine data comes from a static file, [`public/data/bagging-line.json`](public/data/bagging-line.json).

## Getting started

Requires Node.js `^22.22.3 || ^24.15.0 || >=26` (same as Angular 22).

```bash
npm ci
npm start          # http://localhost:4200
```

| Script            | What it does                                                      |
| ----------------- | ----------------------------------------------------------------- |
| `npm start`       | Development server                                                |
| `npm run build`   | Production build into `dist/line-monitor`                         |
| `npm test`        | Unit tests (Vitest, watch mode)                                   |
| `npm run test:ci` | Unit tests, single run without watch, for CI                      |
| `npm run lint`    | ESLint for TypeScript and templates, including architecture rules |

### To see the UI states, use these tricks

- **Loading:** turn on network throttling in DevTools.
- **Error:** rename the JSON file.
- **Empty:** replace the JSON file's content with `[]`.

## Docker

```bash
docker build -t line-monitor .
docker run --rm -p 8080:8080 line-monitor   # http://localhost:8080
```

The image runs nginx as a non-root user, with a strict nonce-based CSP and other security headers (see [`nginx/default.conf`](nginx/default.conf)).

## Notes

- Machines are loaded with `httpResource` and checked at runtime by a small type guard in `parse`.
  Invalid data is logged and shows the same error state as a failed request.
- Failed HTTP requests are logged by an interceptor. `LoggerService` only writes to the console for
  now, but it's the one place to plug in remote logging later.
- Folder boundaries (core / layout / shared / features) are enforced by ESLint, so features can't
  import from each other.
- The header clock updates when the minute changes, not every second.
- CSP: Angular puts the `ngCspNonce` placeholder from `index.html` on all inline scripts and styles,
  and nginx replaces it with a fresh random value for every request. So there's no
  `'unsafe-inline'`, and `index.html` is never cached.
