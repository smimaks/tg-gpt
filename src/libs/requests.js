const lib = {
  resetContext: 'Сброс контекста',
  market: `Напомни подписчикам и гостям сообщества, что подписка и активность в группе мотивирует становиться лучше. Попроси репостить и отмечать лайками все записи сообщества. Напиши это максимально красноречиво. В конце оставь подпись "Ваш GPT"`,
  sign: `сделай отступ в конце и оставь подпись "Ваш GPT"`,
};

export const requestToGPT = {
  science: {
    request: `Напиши интерсный факт из науки и объясни его. ${lib.sign}`,
    image: 'Наука глазами нейросети',
    isUsed: false,
  },
  it: {
    request: `Напиши интерсный факт об it и объясни его. ${lib.sign}`,
    image: 'IT глазами нейросети',
    isUsed: false,
  },
  historyByGPT: {
    request: `Напиши про мир людей глазами GPT-3 и объясни почему ты так это видишь. ${lib.sign}`,
    image: 'Мир людей глазами нейросети',
    isUsed: false,
  },
  medicine: {
    request: `Наиши интерсный факт об медицине и объясни его. ${lib.sign}`,
    image: 'Нмедицина глазами нейросети',
    isUsed: false,
  },
  culture: {
    request: `Напиши интерсный факт о культуре и объясни его. ${lib.sign}`,
    image: 'культура глазами нейросети',
    isUsed: false,
  },
  sport: {
    request: `Напиши интерсный факт о  спорте и объясни его. ${lib.sign}`,
    image: 'спорт глазами нейросети',
    isUsed: false,
  },
  world: {
    request: `Выдумай свою новость и напиши что ее придумал ты и она не настоящая. ${lib.sign}`,
    image: 'новости глазами нейросети',
    isUsed: false,
  },
  joke: {
    request: 'Расскажи анектод',
  },
  ai: {
    request: 'Интересный факт про исскуственный интелект',
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
