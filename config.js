/**
 * CẤU HÌNH THIỆP CƯỚI CÁ NHÂN
 * Bạn chỉ cần sửa thông tin bên dưới, lưu lại và tải lại trang là xong!
 */
window.WEDDING_CONFIG = {
  // 1. Tên cô dâu & chú rể
  brideShortName: 'Trang Nhung',
  groomShortName: 'Quốc Tùng',
  heroCoupleTitle: 'TRANG NHUNG & QUỐC TÙNG',
  brideFullName: 'Phạm Trang Nhung',
  groomFullName: 'Hoàng Quốc Tùng',

  // 2. Chữ lồng (2 chữ cái đầu ở phần mở đầu)
  monogramLeft: 'T',
  monogramRight: 'A',

  // 3. Thời gian & Địa điểm
  heroDate: '01.08.2026',
  ceremonyTime: 'VÀO LÚC 16:30, THỨ BẢY',
  ceremonyDatePipe: '01 | 08 | 2026',
  lunarDate: '(Tức ngày 19 tháng 06 năm Bính Ngọ)',
  venueName: 'TẠI TRUNG TÂM TỔ CHỨC\nTIỆC CƯỚI ROYAL',
  venueAddress: 'Số 8 Mạc Đình Chi, P. Minh Xuân, T. Tuyên Quang',
  mapsUrl: 'https://maps.app.goo.gl/8tgiZzriGANnVCXc6',

  // Đếm ngược (định dạng YYYY-MM-DDTHH:mm:ss+07:00)
  countdownTarget: '2026-08-01T16:30:00+07:00',
  rsvpDeadline: '01-10-2026',

  // 4. Thông tin hai gia đình
  brideFamilyTitle: 'NHÀ GÁI',
  brideParents: 'ÔNG: PHẠM NGỌC CHÍNH\nBÀ: VŨ THỊ TUYÊN',
  groomFamilyTitle: 'NHÀ TRAI',
  groomParents: 'ÔNG: PHẠM NGỌC CHÍNH\nBÀ: VŨ THỊ TUYÊN',

  // 5. Tên khách mời mặc định (nếu URL không có ?name=...)
  defaultGuestName: 'Tên Khách Mời',

  // 6. Lời cảm ơn cuối thiệp
  thankYouText:
    'Cảm ơn đã dành tình cảm cho chúng mình!\nSự hiện diện của bạn chính là món quà ý nghĩa nhất\nvà chúng mình vô cùng trân quý khi được cùng bạn chia sẻ\nniềm hạnh phúc trong ngày trọng đại này.',

  // 7. Nhạc nền (đường dẫn file .mp3 local)
  musicUrl: 'public/assets/audio/wedding-bg-music.mp3',

  // 7b. Google Sheets Web App URL (lưu Sổ Lưu Bút & RSVP chung cho mọi người xem)
  // Hướng dẫn cài đặt chi tiết trong file docs/google-sheets-setup.md
  googleSheetApiUrl: 'https://script.google.com/macros/s/AKfycbyKJSUw7iIK3ihEMdZbu1dwrsaqmpMbxoKk3C_eMhXcwIDpg85DtzLjKMLGrd86qLOurw/exec',

  // 8. Thông tin chuyển khoản / QR Mừng cưới
  bank: {
    bankName: 'VietinBank',
    bankBin: '970415',
    accountNumber: '0869259444',
    accountHolder: 'Vương Huy Trường',
  },

  // 9. Ảnh trên thiệp (tài nguyên local trong public/assets/)
  photos: {
    hero: 'public/assets/photos/hero-cover.jpg',
    storyIntro: 'public/assets/photos/story-intro.jpg',
    groomPortrait: 'public/assets/photos/groom-portrait.jpg',
    bridePortrait: 'public/assets/photos/bride-portrait.jpg',
    foreverBanner: 'public/assets/photos/forever-banner.jpg',
    momentRight: 'public/assets/photos/moment-right.jpg',
    momentLeft: 'public/assets/photos/moment-left.jpg',
    momentBottom: 'public/assets/photos/moment-bottom.jpg',
    thankYouBg: 'public/assets/bg/thank-you-bg.jpg',
    album: [
      'public/assets/album/album-01.jpg',
      'public/assets/album/album-02.jpg',
      'public/assets/album/album-03.jpg',
      'public/assets/album/album-04.jpg',
      'public/assets/album/album-05.jpg',
      'public/assets/album/album-06.jpg',
      'public/assets/album/album-07.jpg',
      'public/assets/album/album-08.jpg',
      'public/assets/album/album-09.jpg',
      'public/assets/album/album-10.jpg',
      'public/assets/album/album-11.jpg',
      'public/assets/album/album-12.jpg',
      'public/assets/album/album-13.jpg',
      'public/assets/album/album-14.jpg',
      'public/assets/album/album-15.jpg',
      'public/assets/album/album-16.jpg',
    ],
  },
};
