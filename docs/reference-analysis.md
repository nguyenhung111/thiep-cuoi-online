# Reference Website Analysis — Trang Nhung & Quốc Tùng

- **Reference URL**: `https://thiepcuoimeli.com/showcase/13bb7177-ccda-49d0-a74b-6ce6f4037307`
- **Inner Invitation URL**: `https://thiepcuoimeli.com/v/thieponline`
- **Template Architecture**: Centered `500px × 7322px` freeform absolute-positioned canvas inside a `#F5F5F4` outer shell (`#FBF6EE` showcase wrapper). On viewports narrower than `500px`, the canvas scales proportionally via `transform: scale(vw / 500)` with zero horizontal overflow.

---

## Sections in Exact Top-to-Bottom Order

### Section 00 — Opening Curtain Overlay (`curtain-reveal-red`)
- **Background**: Transparent fixed fullscreen overlay (`z-index: 9999`), two full-viewport SVG panels (`curtain-left.svg`, `curtain-right.svg`).
- **Interaction / Hint**: `"Nhấn để bỏ qua"` / `"Chạm để mở thiệp"` pill at bottom-center.
- **Behavior**: Opens horizontally (`left: -100%`, `right: +100%`) over `3s` after `0.5s` delay; clicking/tapping dismisses early and unlocks background audio playback.

### Section 01 — Hero / Invitation Cover (`y: 0 – 784px`)
- **Background / Main Image**: Full-bleed portrait photo (`hero-cover.jpg`, `500 × 784px`, `object-fit: cover`).
- **Couple Names**: `"TRANG NHUNG & QUỐC TÙNG"` (`y: 677`, `500 × 42px`, `1FTV VIP Eleanor Goenka`, `31px`, `#FFFFFF`, centered).
- **Wedding Date**: `"01.08.2026"` (`y: 726`, `200 × 42px`, `1FTV VIP Eleanor Goenka`, `33px`, `#FFFFFF`, centered).
- **Animations**: Couple names use `freeform-slide-up` (`3s`), date uses `freeform-zoom-in` (`3s`).

### Section 02 — Intro Monogram, Quote & Countdown (`y: 783 – 1795px`)
- **Background**: Repeating warm paper texture (`paper-texture.jpg`, `opacity: 0.8`) across `y: 784–1264` and `y: 1264–1795`.
- **Decorative Elements**:
  - Top-right floral PNG (`floral-top-right.png`, `200 × 245px` at `x: 300, y: 783`).
  - Bottom-left floral PNG (`floral-bottom-left.png`, `200 × 342px` at `x: 0, y: 1453`).
- **Monogram**:
  - `"T"` (`x: 120, y: 818`, `Mtd Hello Paris Serif b7e5f0`, `90px`, `#911911`, `slide-right`).
  - `"A"` (`x: 142, y: 849`, `Uvn Hoa Tay 1 97b16e`, `99px`, `#911911`, `slide-left`).
- **Quote**: `"WE'VE BEEN WRITING\nOUR LOVE STORY FOR YEARS...\nAND THE NEXT CHAPTER BEGINS IN"` (`y: 958`, `Lora`, `20px`, `letter-spacing: 2px`, `line-height: 1.4`, `#911911`, `zoom-in`).
- **Countdown**: 4-column live timer (`ngày`, `giờ`, `phút`, `giây`) with `:` separators (`SVN-Gilroy`, values `33.6px w700`, labels `17.85px w400`, colons `serif 26px`, `#911911`).
- **Portrait Photo**: `story-intro.jpg` (`351 × 426px` at `x: 75, y: 1209`, `slide-right`).

### Section 03 — Groom & Bride (`y: 1795 – 2517px`)
- **Background**: Full-bleed wedding photo (`groom-bride-bg.jpg`, `500 × 722px`).
- **Staggered Polaroid Cards** (`207 × 349px`, `bg: #FFFFFF`):
  - **Left Card (`x: 17, y: 2096`)**: `groom-portrait.jpg` (`190 × 245px`), `"Chú rể"` (`Uvn Hoa Tay 1 97b16e`, `33px`, `#911911`), `"Quốc Tùng"` (`1FTV VIP Eleanor Goenka`, `39px`, `#911911`).
  - **Right Card (`x: 234, y: 2156`)**: `bride-portrait.jpg` (`190 × 245px`), `"Cô dâu"` (`Uvn Hoa Tay 1 97b16e`, `33px`, `#911911`), `"Trang Nhung"` (`1FTV VIP Eleanor Goenka`, `39px`, `#911911`).

### Section 04 — Parents, Guest Name & Ceremony Details (`y: 2517 – 3563px`)
- **Background**: Paper texture (`y: 2517–3019`, `3016–3518`) + top decorative header (`parents-header.png`, `500 × 144px` at `y: 2517`).
- **Parents Block (`y: 2644`)**:
  - Left: `NHÀ GÁI` (`Lora Semibold`, `16px`) / `"ÔNG: PHẠM NGỌC CHÍNH\nBÀ: VŨ THỊ TUYÊN"` (`Lora`, `15px`).
  - Divider: `2px × 80px` vertical line (`#911911`).
  - Right: `NHÀ TRAI` (`Lora Semibold`, `16px`) / `"ÔNG: PHẠM NGỌC CHÍNH\nBÀ: VŨ THỊ TUYÊN"` (`Lora`, `15px`). *(Note: Reference template left groom parents duplicated; editable via `config.js`.)*
- **Invitation & Guest Name**:
  - `"TRÂN TRỌNG KÍNH MỜI"` (`Lora`, `19px`, `#911911`).
  - Personalized guest name (`1ftv Vip High Spirited 63416d`, `48px`, `#911911`) over dotted line `....`.
  - `"TỚI DỰ BỮA TIỆC CHUNG VUI\nMỪNG LỄ THÀNH HÔN CÙNG GIA ĐÌNH CHÚNG TÔI"` (`Lora`, `18px`, `#911911`).
- **Couple Full Names**: `"Phạm Trang Nhung"` (`Uvn Hoa Tay 1 97b16e`, `60px`), `"&"` (`Fz Manchester Signature`, `60px`), `"Hoàng Quốc Tùng"` (`Uvn Hoa Tay 1 97b16e`, `60px`).
- **Date, Time & Venue**:
  - `"VÀO LÚC 16:30, THỨ BẢY"` (`Lora Semibold`, `24px`).
  - `"01 | 08 | 2026"` (`Mtd Hello Paris Serif b7e5f0`, `59px`).
  - `"(Tức ngày 19 tháng 06 năm Bính Ngọ)"` (`serif`, `19px`).
  - `"TẠI TRUNG TÂM TỔ CHỨC\nTIỆC CƯỚI ROYAL"` (`DFVN Mighty Wings`, `24px`).
  - `"Số 8 Mạc Đình Chi, P. Minh Xuân, T. Tuyên Quang"` (`Lora`, `19px`).
- **Google Maps Banner (`y: 3511`)**: `maps-banner.png` (`500 × 51px`), pulsing (`freeform-loop-pulse`), links to `https://maps.app.goo.gl/8tgiZzriGANnVCXc6`.

### Section 05 — Gift / Red Envelope & "Forever Starts Here" (`y: 3518 – 4178px`)
- **Background**: Paper texture (`500 × 502px`) + decorative floral banner (`gift-floral-banner.png`, `500 × 205px` at `y: 3580`).
- **Gift Action**: Pill button `"GỬI MỪNG CƯỚI"` (`257 × 42px`, `#801008`, white `serif 22px`) + pulsing `red-envelope-card.webp` (`150 × 167px` at `y: 3619`) opening the VietQR gift modal.
- **Forever Banner (`y: 3786 – 4178`)**: `forever-banner.jpg` (`500 × 392px`) with `"Forever"` (`Flavinda d393f3`, `120px`, `#FFFFFF`) and `"STARTS HERE"` (`Lora Semibold`, `26px`, `#FFFFFF`).

### Section 06 — Calendar (`y: 4178 – 4666px`)
- **Background**: Paper texture (`500 × 488px`) + floral (`calendar-floral.png`) + calendar frame (`calendar-frame.png`, `464 × 318px`).
- **Content**: `"Tháng 8"` (`Uvn Hoa Tay 1 97b16e`, `30px`, `#911911`) and 7 columns (`T2`–`CN`, `serif 15px`, `#911911`).

### Section 07 — Our Moments Collage (`y: 4646 – 5647px`)
- **Background**: Paper texture (`y: 4666–5154`, `y: 5154–5647`) + torn-paper/floral PNG (`moments-torn-paper.png`, `459 × 225px` at `y: 4944`).
- **Typography**: `"Our Moments"` (`Uvn Hoa Tay 1 97b16e`, `90px`, `#911911`), `"OUR LOVE"` (`DFVN Mighty Wings`, `30px`, `#911911`).
- **Photos**: `moment-right.jpg` (`157 × 252px`), `moment-left.jpg` (`193 × 200px`), `moment-bottom.jpg` (`228 × 322px`).
- **Quote**: `"SOME MOMENTS STAY WITH YOU FOREVER.\nTHEY'RE NOT LOUD OR GRAND\nBUT THEY'RE FULL OF MEANING,\nWARMTH, AND LOVE."` (`Lora`, `17px`, `#911911`).

### Section 08 — 3D Album (`y: 5506 – 5894px`)
- **Heading**: `"ALBUM ẢNH CƯỚI"` (`Times New Roman`, `22px`, uppercase, `#911911`).
- **Carousel**: 16 photos in a 3D perspective stage (`perspective: 1000px`), prev/next arrows, touch swipe, autoplay (`4s`), counter (`1 / 16`).
- **Lightbox**: Clicking the center slide opens a full-screen dialog with prev/next navigation, close button, and 16 thumbnail buttons.

### Section 09 — Guestbook / Sổ Lưu Bút (`y: 5871 – 6485px`)
- **Divider**: `guestbook-divider.webp` (`500 × 62px` at `y: 5871`).
- **Card (`411 × 608px` at `x: 45, y: 5877`)**: `"Sổ Lưu Bút"`, `"LỜI CHÚC TỪ BẠN BÈ"`, side radio pills (`🤵 Nhà trai`, `👰 Nhà gái`), name input, message textarea, `"Gửi lời chúc"` button, and auto-scrolling wishes list persisted in `localStorage`.

### Section 10 — RSVP & Closing Thank You (`y: 6489 – 7322px`)
- **Badge**: `rsvp-badge.webp` (`68 × 80px` at `x: 216, y: 6489`).
- **Closing Photo**: `thank-you-bg.jpg` spanning the closing area behind RSVP and Thank You, with a `rgba(0, 0, 0, 0.33)` scrim (`500 × 201px` at `y: 7124`).
- **RSVP Form (`y: 6521`)**: `"Bạn sẽ đến dự chứ?"`, `"Vui lòng xác nhận trước ngày ..."`, `"Họ và tên"` input, `"✓ Sẽ đến"` and `"Tiếc, không đến"` buttons.
- **Thank You Text (`y: 7134`)**: 4-line Vietnamese thank-you message (`Lora 17px`, `#FFFFFF`) + `"Thank You!"` (`Uvn Hoa Tay 1 97b16e`, `44px`, `#FFFFFF`).
