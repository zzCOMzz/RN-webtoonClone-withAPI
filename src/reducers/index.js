export const initLoginState = {
  isLoading: false,
  isLogin: false,
  data: [],
  userData: {},
  count: 0,
  banners: [
    {
      title: 'The Secret of Angel',
      url:
        'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=500&q=90',
    },
    {
      title: 'Pasutri Gaje',
      url:
        'https://swebtoon-phinf.pstatic.net/20190426_250/1556275073714Qaxl5_JPEG/thumb_M.jpg',
    },
    {
      title: 'Young Mom',
      url: 'https://www.rimma.co/wp-content/uploads/2016/09/eggnoid.jpg',
    },
    {
      title: 'Terlalu T ampan',
      url:
        'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/cewekbangetfoto/original/33920_3-komik-webtoon-indonesia-ini-dijamin-bisa-bikin-kita-baper.jpg',
    },
  ],
  images: [
    'https://asset-a.grid.id/crop/0x0:0x0/700x465/photo/cewekbangetfoto/original/33920_3-komik-webtoon-indonesia-ini-dijamin-bisa-bikin-kita-baper.jpg',
    'https://www.rimma.co/wp-content/uploads/2016/09/eggnoid.jpg',
    'https://swebtoon-phinf.pstatic.net/20190426_250/1556275073714Qaxl5_JPEG/thumb_M.jpg',
    'https://akcdn.detik.net.id/community/media/visual/2019/04/03/dac43146-7dd4-49f4-89ca-d81f57b070fc.jpeg?w=500&q=90',
  ],
};

export const appReducer = (state = initLoginState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLogin: (state.isLogin = true),
        userData: (state.userData = action.userData),
      };

    default:
      return;
  }
};
