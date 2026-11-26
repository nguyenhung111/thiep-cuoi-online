/**
 * CẤU HÌNH THIỆP CƯỚI CÁ NHÂN (Hỗ trợ 2 phiên bản Nhà Trai & Nhà Gái)
 * Tự động nhận diện qua subdomain (vd: nhatrai.*, nhagai.*) hoặc ?side=nha_trai | ?side=nha_gai
 */
(function () {
  const COMMON_PHOTOS = {
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
  };

  // Thông tin mặc định chung (có thể override riêng trong từng nhà bên dưới)
  const SHARED_VENUE = {
    venueName: 'TẠI TƯ GIA NHÀ TRAI',
    venueAddress: 'Thôn Phần Dương, xã Phạm Ngũ Lão,\ntỉnh Hưng Yên',
    mapsUrl: 'https://maps.app.goo.gl/Uejpb5EgWAXCz3Jf7',
    mapEmbedUrl:
      'https://maps.google.com/maps?q=20.8592905,106.0780753&z=16&output=embed',
  };

  const SHARED_SCHEDULE = {
    heroDate: '27.12.2026',
    ceremonyTime: 'VÀO LÚC 11:15, CHỦ NHẬT',
    ceremonyDay: '27',
    ceremonyMonth: 'Tháng 12',
    ceremonyYear: '2026',
    ceremonyLunarDate: '(Tức ngày 19 tháng 11 năm Bính Ngọ)',
    partyTitle: 'TIỆC MỪNG CHUNG VUI',
    partyTime: 'VÀO LÚC 16:00, THỨ BẢY',
    partyDay: '26',
    partyMonth: 'Tháng 12',
    partyYear: '2026',
    partyLunarDate: '(Tức ngày 18 tháng 11 năm Bính Ngọ)',
    partyReceptionTime: '16:00',
    partyFeastTime: '16:30',
    countdownTarget: '2026-12-27T11:15:00+07:00',
    rsvpDeadline: '20-12-2026',
  };

  window.WEDDING_CONFIG = {
    // Bản mặc định nếu truy cập domain chính không kèm subdomain hay ?side=
    defaultSide: 'nha_trai',

    // Tên khách mời mặc định (nếu URL không có ?name=...)
    defaultGuestName: 'Quý Khách',

    // Lời cảm ơn cuối thiệp
    thankYouText:
      'Cảm ơn đã dành tình cảm cho chúng mình!\nSự hiện diện của bạn chính là món quà ý nghĩa nhất\nvà chúng mình vô cùng trân quý khi được cùng bạn chia sẻ\nniềm hạnh phúc trong ngày trọng đại này.',

    // Nhạc nền (đường dẫn file .mp3 local)
    musicUrl: 'public/assets/audio/vay-cuoi.mp3',

    // Google Sheets Web App URL (lưu Sổ Lưu Bút & RSVP chung)
    googleSheetApiUrl:
      'https://script.google.com/macros/s/AKfycbyKJSUw7iIK3ihEMdZbu1dwrsaqmpMbxoKk3C_eMhXcwIDpg85DtzLjKMLGrd86qLOurw/exec',

    // Ảnh chung
    photos: COMMON_PHOTOS,

    // Cấu hình riêng cho Nhà Trai và Nhà Gái
    sides: {
      nha_trai: {
        sideKey: 'nha_trai',
        pageTitle: 'Văn Hưng & Quỳnh Trang · Thiệp Cưới Online',
        heroCoupleTitle: 'VĂN HƯNG & QUỲNH TRANG',
        monogramLeft: 'H',
        monogramRight: 'T',

        // Hai thẻ chân dung: Chú rể bên trái (trước), Cô dâu bên phải (sau)
        firstRoleLabel: 'Chú rể',
        firstShortName: 'Văn Hưng',
        secondRoleLabel: 'Cô dâu',
        secondShortName: 'Quỳnh Trang',
        firstPortraitPhotoKey: 'groomPortrait',
        secondPortraitPhotoKey: 'bridePortrait',

        // Phụ huynh: Nhà trai bên trái, Nhà gái bên phải
        leftFamilyTitle: 'NHÀ TRAI',
        leftParents: 'ÔNG: NGUYỄN VĂN THOÁI\nBÀ: NGUYỄN THỊ MAI',
        rightFamilyTitle: 'NHÀ GÁI',
        rightParents: 'BÀ: NGUYỄN THỊ HUYỀN',

        invitationLine:
          'TỚI DỰ LỄ THÀNH HÔN & BỮA TIỆC THÂN MẬT\nCÙNG GIA ĐÌNH CHÚNG TÔI',
        firstPersonName: 'Văn Hưng',
        secondPersonName: 'Quỳnh Trang',

        // Nghi lễ (đứng trước) & Tiệc mừng (đứng sau)
        ceremonyTitle: 'LỄ THÀNH HÔN',
        ...SHARED_SCHEDULE,
        ...SHARED_VENUE,

        calendarEvent: {
          title: 'Lễ Thành Hôn Văn Hưng & Quỳnh Trang',
          start: '20261227T111500',
          end: '20261227T140000',
          details:
            'Tiệc mừng: 16:00 Thứ Bảy 26/12/2026 · Lễ Thành Hôn: 11:15 Chủ Nhật 27/12/2026',
        },

        defaultGuestbookSide: 'nha_trai',

        // QR Mừng cưới riêng của Nhà Trai
        bank: {
          bankName: 'VPBank',
          bankBin: '970432',
          accountNumber: '268636609',
          accountHolder: 'NGUYEN VAN HUNG',
        },
      },

      nha_gai: {
        sideKey: 'nha_gai',
        pageTitle: 'Quỳnh Trang & Văn Hưng · Thiệp Cưới Online',
        heroCoupleTitle: 'QUỲNH TRANG & VĂN HƯNG',
        monogramLeft: 'T',
        monogramRight: 'H',

        // Hai thẻ chân dung: Cô dâu bên trái (trước), Chú rể bên phải (sau)
        firstRoleLabel: 'Cô dâu',
        firstShortName: 'Quỳnh Trang',
        secondRoleLabel: 'Chú rể',
        secondShortName: 'Văn Hưng',
        firstPortraitPhotoKey: 'bridePortrait',
        secondPortraitPhotoKey: 'groomPortrait',

        // Phụ huynh: Nhà gái bên trái, Nhà trai bên phải
        leftFamilyTitle: 'NHÀ GÁI',
        leftParents: 'BÀ: NGUYỄN THỊ HUYỀN',
        rightFamilyTitle: 'NHÀ TRAI',
        rightParents: 'ÔNG: NGUYỄN VĂN THOÁI\nBÀ: NGUYỄN THỊ MAI',

        invitationLine:
          'TỚI DỰ LỄ VU QUY & BỮA TIỆC THÂN MẬT\nCÙNG GIA ĐÌNH CHÚNG TÔI',
        firstPersonName: 'Quỳnh Trang',
        secondPersonName: 'Văn Hưng',

        // Nghi lễ (đứng trước) & Tiệc mừng (đứng sau)
        ceremonyTitle: 'LỄ VU QUY',
        ...SHARED_SCHEDULE,
        ...SHARED_VENUE,
        ceremonyTime: 'VÀO LÚC 11:45, CHỦ NHẬT',
        countdownTarget: '2026-12-27T11:45:00+07:00',
        venueName: 'TẠI TƯ GIA NHÀ GÁI',
        venueAddress: 'Thôn Ninh Thôn (La Chàng cũ),\nxã Nguyễn Trãi, tỉnh Hưng Yên',
        mapsUrl: 'https://maps.app.goo.gl/jVdFegVpByAMa8bT8',
        mapEmbedUrl:
          'https://maps.google.com/maps?q=20.782653,106.090092&z=16&output=embed',

        calendarEvent: {
          title: 'Lễ Vu Quy Quỳnh Trang & Văn Hưng',
          start: '20261227T114500',
          end: '20261227T140000',
          details:
            'Tiệc mừng: 16:00 Thứ Bảy 26/12/2026 · Lễ Vu Quy: 11:45 Chủ Nhật 27/12/2026',
        },

        defaultGuestbookSide: 'nha_gai',

        // QR Mừng cưới riêng của Nhà Gái
        bank: {
          bankName: 'Techcombank',
          bankBin: '970407',
          accountNumber: '19039052481011',
          accountHolder: 'PHAM QUYNH TRANG',
        },
      },
    },
  };
})();
