# Design Specification

## 1. Layout & Container System
- **Outer Shell (`.page-shell`)**: `min-height: 100vh`, flex column centered, `background-color: #f5f5f4`.
- **Canvas Viewport (`.canvas-viewport`)**: `width: 100%`, `max-width: 500px`, `overflow: hidden`, `box-shadow: 0 20px 50px rgba(0, 0, 0, 0.12)`, `background-color: #ffffff`.
- **Freeform Canvas (`.freeform-canvas`)**: Fixed coordinate space `500px × 7322px`, `position: relative`, `isolation: isolate`, `transform-origin: top left`.
- **Element Positioning**: Every visual element uses `.freeform-element` with `position: absolute; top: 0; left: 0; transform: translate3d(Xpx, Ypx, 0);` and explicit `width`, `height`, `z-index`, `opacity`.

## 2. Color Palette
```css
:root {
  --color-primary: #911911;       /* Deep crimson used for all headings, body text, dividers */
  --color-primary-dark: #801008;  /* Button fill ("GỬI MỪNG CƯỚI") */
  --color-secondary: #d97a85;     /* RSVP "Sẽ đến" primary CTA */
  --color-background: #f5f5f4;    /* Outer viewport gutter */
  --color-surface: #ffffff;       /* Canvas & Polaroid cards */
  --color-scrim: rgba(0, 0, 0, 0.33); /* Closing text backdrop (#00000054) */
  --color-text-light: #ffffff;    /* Hero, Forever banner, Thank You text */
}
```

## 3. Typography
| Element | Font Family | Size | Weight | Color | Line Height / Tracking |
|---|---|---|---|---|---|
| Hero Names | `'1FTV VIP Eleanor Goenka'` | `31px` | `400` | `#ffffff` | default |
| Hero Date | `'1FTV VIP Eleanor Goenka'` | `33px` | `400` | `#ffffff` | default |
| Monogram Left (`T`) | `'Mtd Hello Paris Serif b7e5f0'` | `90px` | `400` | `#911911` | `1.3` |
| Monogram Right (`A`) | `'Uvn Hoa Tay 1 97b16e'` | `99px` | `400` | `#911911` | default |
| Intro Quote | `'Lora'` | `20px` | `400` | `#911911` | `1.4` / `2px` |
| Countdown Values | `'SVN-Gilroy'` | `33.6px` | `700` | `#911911` | `1.15` |
| Countdown Labels | `'SVN-Gilroy'` | `17.85px` | `400` | `#911911` | `1.15` |
| Countdown Colons | `serif` | `26px` | `400` | `#911911` | default |
| Groom/Bride Label | `'Uvn Hoa Tay 1 97b16e'` | `33px` | `400` | `#911911` | default |
| Groom/Bride Name | `'1FTV VIP Eleanor Goenka'` | `39px` | `400` | `#911911` | default |
| Parents Titles | `'Lora Semibold 39de4b'` | `16px` | `700` | `#911911` | default |
| Parents Names | `'Lora'` | `15px` | `400` | `#911911` | `1.5` |
| Guest Name | `'1ftv Vip High Spirited 63416d'` | `48px` | `400` | `#911911` | `1.2` |
| Full Couple Names | `'Uvn Hoa Tay 1 97b16e'` | `60px` | `400` | `#911911` | default |
| Ampersand (`&`) | `'Fz Manchester Signature'` | `60px` | `400` | `#911911` | default |
| Ceremony Time | `'Lora Semibold 39de4b'` | `24px` | `700` | `#911911` | `1.5` |
| Ceremony Date Pipe | `'Mtd Hello Paris Serif b7e5f0'` | `59px` | `400` | `#911911` | `1.5` |
| Venue Name | `'DFVN Mighty Wings'` | `24px` | `700` | `#911911` | `1.5` |
| Venue Address | `'Lora'` | `19px` | `400` | `#911911` | `1.5` |
| `"Forever"` | `'Flavinda d393f3'` | `120px` | `400` | `#ffffff` | default |
| `"STARTS HERE"` | `'Lora Semibold 39de4b'` | `26px` | `400` | `#ffffff` | default |
| `"Our Moments"` | `'Uvn Hoa Tay 1 97b16e'` | `90px` | `400` | `#911911` | default |
| `"OUR LOVE"` | `'DFVN Mighty Wings'` | `30px` | `400` | `#911911` | default |
| Album Heading | `"Times New Roman", serif` | `22px` | `700` | `#911911` | `1px` tracking |
| Guestbook Heading | `'Lora Semibold 39de4b'` | `26px` | `500` | `#911911` | `0.04em` |
| RSVP Heading | `'Cormorant Garamond'` | `30px` | `600` | `#911911` | default |
| Thank You Body | `'Lora'` | `17px` | `400` | `#ffffff` | default |
| `"Thank You!"` | `'Uvn Hoa Tay 1 97b16e'` | `44px` | `400` | `#ffffff` | default |

## 4. Floating Controls & Modals
- **Music Button (`#music-fab`)**: Fixed at top-right of the 500px canvas (`top: 20px`, `right: calc(50% - 230px)` on desktop, `right: 20px` on mobile), `35px × 35px` circular button with music icon & pulse ring when playing.
- **QR Gift Dialog (`#qr-dialog`)**: Native `<dialog>` with `closedby="any"`, VietQR image, bank details, and copy-account-number button.
- **Album Lightbox (`#lightbox-dialog`)**: Native `<dialog>` with prev/next buttons, close button, main photo, and 16-thumbnail strip.
