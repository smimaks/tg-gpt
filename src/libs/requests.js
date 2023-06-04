const lib = {
  resetContext: 'Сброс контекста',
  market: `Напомни подписчикам и гостям сообщества, что подписка и активность в группе мотивирует становиться лучше. Попроси репостить и отмечать лайками все записи сообщества. Напиши это максимально красноречиво. В конце оставь подпись "Ваш GPT"`,
  sign: `сделай отступ в конце и оставь подпись "Ваш GPT"`,
};

export const requestToGPT = {
  science: {
    request: `Напиши интерсный факт из науки и объясни его. ${lib.sign}`,
    image: 'draw an abstract picture about science',
    isUsed: false,
  },
  it: {
    request: `Напиши интерсный факт об it и объясни его. ${lib.sign}`,
    image: 'draw picture where js-developer make some great web-app',
    isUsed: false,
  },
  historyByGPT: {
    request: `Напиши про мир людей глазами GPT-3 и объясни почему ты так это видишь. ${lib.sign}`,
    image: 'draw people world',
    isUsed: false,
  },
  medicine: {
    request: `Наиши интерсный факт об медицине и объясни его. ${lib.sign}`,
    image: 'draw an abstract picture about medicine',
    isUsed: false,
  },
  culture: {
    request: `Напиши интерсный факт о культуре и объясни его. ${lib.sign}`,
    image: 'draw some abstract picture about people culture',
    isUsed: false,
  },
  sport: {
    request: `Напиши что нибудь о спорте и объясни почему ты написал именно это. ${lib.sign}`,
    image: 'draw an abstract picture about people sport',
    isUsed: false,
  },
  world: {
    request: `Выдумай свою новость и напиши что ее придумал ты и она не настоящая. ${lib.sign}`,
    image: 'draw an abstract picture about people news',
    isUsed: false,
  },
  joke: {
    request: `Придумай шутку, которая станет лучшей шуткой тысячелетия. ${lib.sign}`,
    image: 'нарисуй премию за самую тупую шутку',
  },
  ai: {
    request: `Самый необычный факт про исскуственный интелект. ${lib.sign}`,
    image: 'нарисуй сам себя',
  },
};

export function getRequest() {
  const requests = {
    text: '',
    imagePrompt: '',
  };

  let counter = 0;
  const reqValues = Object.values(requestToGPT);

  for (const val of reqValues) {
    counter += 1;

    if (counter === reqValues.length) {
      for (const val of reqValues) {
        val.isUsed = false;
      }
    }
    if (val.isUsed) continue;

    if (!val.isUsed) {
      val.isUsed = true;
      requests.text = val.request;
      requests.imagePrompt = val.image;
      break;
    }
  }

  return requests;
}
