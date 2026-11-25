# Responsive Specification

## Breakpoints & Scaling Strategy
Because the reference invitation is a `500px × 7322px` freeform editorial canvas, responsive behavior uses proportional canvas scaling below `500px` and centered framing at `>= 500px`:

```js
const scale = vw < 500 ? vw / 500 : 1;
canvasEl.style.transform = scale < 1 ? `scale(${scale})` : 'none';
viewportEl.style.height = `${Math.round(7322 * scale)}px`;
```

## Target Viewports
| Device Class | Dimensions | Scale Factor | Canvas Rendered Size | Floating Music Button |
|---|---|---|---|---|
| Desktop | `1440 × 900` | `1.0` | `500 × 7322px` centered (`#F5F5F4` gutters) | Fixed top-right of canvas (`35×35px`) |
| Laptop | `1366 × 768` | `1.0` | `500 × 7322px` centered | Fixed top-right of canvas (`35×35px`) |
| Tablet | `768 × 1024` | `1.0` | `500 × 7322px` centered | Fixed top-right of canvas (`35×35px`) |
| Mobile | `390 × 844` | `0.78` | `390 × 5711px` full-width | Fixed top-right (`right: 16px, top: 16px`) |
| Small Mobile | `360 × 800` | `0.72` | `360 × 5272px` full-width | Fixed top-right (`right: 14px, top: 14px`) |

## Mobile Guarantees
- `html, body { overflow-x: hidden; }` prevents horizontal scrollbar.
- `.canvas-viewport` height matches `Math.round(7322 * scale)` so there is no empty whitespace below the scaled canvas.
- Dialogs (`#qr-dialog`, `#lightbox-dialog`) use `max-width: min(92vw, ...)` and touch-friendly `>= 44px` interactive controls.
