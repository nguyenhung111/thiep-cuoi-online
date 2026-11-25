# Browser & Functional Testing Report

- **Tested URL**: `http://localhost:4173` (Google Chrome via `chrome_devtools` MCP)
- **Reference URL**: `https://thiepcuoimeli.com/showcase/13bb7177-ccda-49d0-a74b-6ce6f4037307`

## 1. Functional Checklist
- [x] **Website loads cleanly**: All 66 network requests returned HTTP 200; **0 console errors**.
- [x] **Image & Asset Integrity**: All 66 `<img>` elements (excluding `#lightbox-img` prior to opening) passed `complete === true && naturalWidth > 0`. Fixed `.webp` -> `.svg` extension mismatch for `red-envelope-card.svg` (`280×320`) and `rsvp-badge.svg` (`139×150`), and added local `favicon.svg`.
- [x] **Custom Fonts**: All 10 local `@font-face` families and 2 Google Fonts families (`Cormorant Garamond`, `Inter`) reported `status: "loaded"` in `document.fonts`.
- [x] **Opening Curtain (`#curtain-overlay`)**: Renders on load and dismisses cleanly on click, revealing the hero section and triggering background music.
- [x] **Music Player (`#music-fab`)**: Toggles play/pause cleanly (`aria-pressed` switches `"true"`/`"false"`, `.playing` class toggles).
- [x] **Scroll Animations**: All scroll-triggered `data-anim` elements (`fade`, `slide-up`, `slide-down`, `slide-left`, `slide-right`, `zoom-in`) reveal on scroll.
- [x] **Google Maps Link**: Verified `href="https://maps.app.goo.gl/8tgiZzriGANnVCXc6"` on the Maps banner.
- [x] **Gift / QR Modal (`#qr-dialog`)**: Clicking `#qr-box-trigger` opens the dialog with VietQR image (`540×640`), bank info (`VietinBank`, `Vương Huy Trường`, `0869259444`), working copy button (`"Đã sao chép STK!"`), and close button.
- [x] **3D Album & Lightbox (`#lightbox-dialog`)**: Next/Prev arrows advance slides and update counter; clicking the center slide opens the lightbox with Prev/Next controls, 16 clickable thumbnails (`Xem ảnh 1..16`), and close button.
- [x] **Guestbook (`#guestbook-form`)**: Submitting a wish prepends it to `#gb-list` and persists to `localStorage` (static frontend; no remote backend API).
- [x] **RSVP (`#rsvp-form`)**: Entering a name and clicking `"✓ Sẽ đến"` renders the confirmation status message (static frontend; no remote backend API).

## 2. Responsive Verification (`scrollWidth <= innerWidth`)
| Viewport | `innerWidth` | `scrollWidth` | Result |
|---|---|---|---|
| Desktop (`1440×900`) | `1440` | `1425` | PASS (0 overflow) |
| Laptop (`1366×768`) | `1366` | `1351` | PASS (0 overflow) |
| Tablet (`768×1024`) | `768` | `753` | PASS (0 overflow) |
| Mobile (`390×844`) | `390` | `390` | PASS (0 overflow) |
| Small Mobile (`360×800`) | `360` | `360` | PASS (0 overflow) |

## 3. Remaining Differences vs Reference Site
1. **Standalone vs Showcase Wrapper**: The reference URL wraps the invitation in a top Meli showcase bar (`← Quay lại` / `Dùng mẫu này`) and a desktop-only QR sidebar; the standalone clone renders the invitation directly.
2. **Interactive Gift QR Modal & RSVP**: On the reference showcase, clicking `"Quà tặng cưới"` dispatches `tcm-qrbox-open` without opening a modal, and the RSVP/Guestbook forms post to Meli's backend API. In the standalone clone, the QR modal works locally via VietQR, Guestbook persists in `localStorage`, and RSVP displays a local confirmation message.
3. **Preserved Reference Template Quirks**: Both the reference and clone share the same duplicated parent names (`ÔNG: PHẠM NGỌC CHÍNH / BÀ: VŨ THỊ TUYÊN`) and August 2026 calendar day numbers (`T5=1`, etc.), all easily editable in `config.js` / `index.html`.
