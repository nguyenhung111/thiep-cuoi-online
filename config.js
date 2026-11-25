/**
 * CẤU HÌNH THIỆP CƯỚI CÁ NHÂN
 * Bạn chỉ cần sửa thông tin bên dưới, lưu lại và tải lại trang là xong!
 */
window.WEDDING_CONFIG = {
  // 1. Tên cô dâu & chú rể
  brideShortName: 'Quỳnh Trang',
  groomShortName: 'Văn Hưng',
  heroCoupleTitle: 'QUỲNH TRANG & VĂN HƯNG',
  brideFullName: 'Quỳnh Trang',
  groomFullName: 'Văn Hưng',

  // 2. Chữ lồng (2 chữ cái đầu ở phần mở đầu)
  monogramLeft: 'T',
  monogramRight: 'H',

  // 3. Thời gian & Địa điểm
  heroDate: '27.12.2026',
  ceremonyTime: 'VÀO LÚC 11:15, CHỦ NHẬT',
  ceremonyDatePipe: '27 | 12 | 2026',
  lunarDate: '(Tức ngày 19 tháng 11 năm Bính Ngọ)\nĐãi tiệc: 16:00, Thứ Bảy 26/12/2026 (18/11 ÂL)',
  venueName: 'TẠI TƯ GIA NHÀ TRAI',
  venueAddress: 'Thôn Phần Dương, xã Phạm Ngũ Lão,\ntỉnh Hưng Yên',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Th%C3%B4n+Ph%E1%BA%A7n+D%C6%B0%C6%A1ng,+Ph%E1%BA%A1m+Ng%C5%A9+L%C3%A3o,+H%C6%B0ng+Y%C3%AAn',

  // Đếm ngược (định dạng YYYY-MM-DDTHH:mm:ss+07:00)
  countdownTarget: '2026-12-27T11:15:00+07:00',
  rsvpDeadline: '20-12-2026',

  // 4. Thông tin hai gia đình
  brideFamilyTitle: 'NHÀ GÁI',
  brideParents: 'BÀ: NGUYỄN THỊ HUYỀN\nThôn Ninh Thôn (La Chàng cũ),\nxã Nguyễn Trãi, Hưng Yên',
  groomFamilyTitle: 'NHÀ TRAI',
  groomParents: 'ÔNG: NGUYỄN VĂN THOÁI\nBÀ: NGUYỄN THỊ MAI\nThôn Phần Dương, xã Phạm Ngũ Lão,\nHưng Yên',

  // 5. Tên khách mời mặc định (nếu URL không có ?name=...)
  defaultGuestName: 'Tên Khách Mời',

  // 6. Lời cảm ơn cuối thiệp
  thankYouText:
    'Cảm ơn đã dành tình cảm cho chúng mình!\nSự hiện diện của bạn chính là món quà ý nghĩa nhất\nvà chúng mình vô cùng trân quý khi được cùng bạn chia sẻ\nniềm hạnh phúc trong ngày trọng đại này.',

  // 7. Nhạc nền (đường dẫn file .mp3 local)
  musicUrl: 'public/assets/audio/vay-cuoi.mp3',

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
