# Animation Specification

All animations respect `@media (prefers-reduced-motion: reduce)` by disabling motion and revealing elements immediately.

## 1. Opening Curtain (`curtain-reveal-red`)
- **Elements**: `.curtain-panel.left`, `.curtain-panel.right`, `.curtain-overlay`
- **Trigger**: Automatic `800ms` after page load (`curtain-overlay.open`), or immediate on click / `Enter` / `Space`, with a `6000ms` auto-dismiss fallback.
- **Initial State**: `transform: translateX(0)`, `opacity: 1`.
- **Final State**: `.left { transform: translateX(-100%); }`, `.right { transform: translateX(100%); }`, overlay fades out (`opacity: 0` over `0.6s ease`) and hides (`display: none`).
- **Duration / Easing**: `3s` `cubic-bezier(0.65, 0, 0.35, 1)` with `0.5s` delay.

## 2. Scroll-Triggered Entrance Animations (`IntersectionObserver`, `threshold: 0.05`)
Triggered once per element after the curtain dismisses. Pending elements start with `.anim-pending { opacity: 0; }`.
Timing function: `cubic-bezier(0.22, 0.61, 0.36, 1)`, `animation-fill-mode: both`.

| Class | Initial State | Final State | Duration Range |
|---|---|---|---|
| `.freeform-anim-fade` | `opacity: 0` | `opacity: 1` | `2.5s – 3.5s` |
| `.freeform-anim-slide-up` | `opacity: 0; translateY(40px)` | `opacity: 1; translateY(0)` | `2.5s – 3s` |
| `.freeform-anim-slide-down` | `opacity: 0; translateY(-40px)` | `opacity: 1; translateY(0)` | `2.5s` |
| `.freeform-anim-slide-left` | `opacity: 0; translateX(40px)` | `opacity: 1; translateX(0)` | `2.5s – 3s` |
| `.freeform-anim-slide-right` | `opacity: 0; translateX(-40px)` | `opacity: 1; translateX(0)` | `2.5s – 3s` |
| `.freeform-anim-zoom-in` | `opacity: 0; scale(0.6)` | `opacity: 1; scale(1)` | `2.5s – 3s` |

## 3. Continuous Loop Animations
- **`.freeform-loop-pulse`** (Maps banner, Red envelope): `scale(1)` ↔ `scale(1.05)`, `1s ease-in-out infinite`.
- **`.music-fab.playing`**: Pulse ring shadow `2s ease-in-out infinite` + inner icon subtle pulse/spin.

## 4. Interactive Transitions
- **3D Album (`.bd-alb-3d .slide`)**: `transform 0.5s ease, opacity 0.5s ease`, autoplay every `4000ms` (pauses on hover).
- **Modals (`dialog.meli-dialog`)**: `opacity` + `scale(0.95 -> 1)` over `0.22s ease-out` using `@starting-style` and `transition-behavior: allow-discrete`.
- **Guestbook List**: Smooth auto-scroll (`+0.5px` every `30ms`), pauses `2200ms` on hover/touch.
