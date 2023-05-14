const lib = {
  resetContext: 'Сброс контекста',
  market: `Напомни подписчикам и гостям сообщества, что подписка и активность в группе мотивирует становиться лучше. Попроси репостить и отмечать лайками все записи сообщества. Напиши это максимально красноречиво. В конце оставь подпись "Ваш GPT"`,
  sign: `Напиши для него заголовок и в конце оставь подпись "Ваш GPT"`,
};

export const requestToGPT = {
  science: {
    request: `Найди интерсный факт о науке и объясни его для подписчиков в вк. ${lib.sign}`,
    image: 'Наука глазами нейросети',
    isUsed: false,
  },
  it: {
    request: `Найди интерсный факт об it и объясни его. ${lib.sign}`,
    image: 'IT глазами нейросети',
    isUsed: false,
  },
  historyByGPT: {
    request: `Расскажи про мир людей глазами GPT-3. ${lib.sign}`,
    image: 'Мир людей глазами нейросети',
    isUsed: false,
  },
  medicine: {
    request: `Найди интерсный факт об медицине и объясни его. ${lib.sign}`,
    image: 'Нмедицина глазами нейросети',
    isUsed: false,
  },
  culture: {
    request: `Найди интерсный факт о культуре и объясни его. ${lib.sign}`,
    image: 'культура глазами нейросети',
    isUsed: false,
  },
  sport: {
    request: `Найди интерсный факт о  спорте и объясни его. ${lib.sign}`,
    image: 'спорт глазами нейросети',
    isUsed: false,
  },
  world: {
    request: `Выдумай свою новость и объясни ее. ${lib.sign}`,
    image: 'новости глазами нейросети',
    isUsed: false,
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
