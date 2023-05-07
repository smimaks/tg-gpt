const lib = {
  resetContext: 'Сброс контекста',
  market: `Напомни подписчикам и гостям сообщества, что подписка и активность в группе мотивирует становиться лучше. Попроси репостить и отмечать лайками все записи сообщества. Напиши это максимально красноречиво. В конце оставь подпись "Ваш GPT"`,
  sign: `В конце оставь подпись "Ваш GPT"`,
};

export const requestToGPT = {
  science: {
    request: `Найди самую удивительную новость в науке на сегодняшний день и объясни ее. ${lib.sign}`,
    image: 'Наука глазами нейросети',
    isUsed: false,
  },
  it: {
    request: `Найди самую удивительную новость в it на сегодняшний день и объясни ее. ${lib.sign}`,
    image: 'IT глазами нейросети',
    isUsed: false,
  },
  historyByGPT: {
    request: `Расскажи про мир людей глазами GPT-3. ${lib.sign}`,
    image: 'Мир людей глазами нейросети',
    isUsed: false,
  },
  medicine: {
    request: `Найди самую удивительную новость в медицине на сегодняшний день и объясни ее. ${lib.sign}`,
    image: 'Нмедицина глазами нейросети',
    isUsed: false,
  },
  culture: {
    request: `Найди самую удивительную новость в культуре на сегодняшний день и объясни ее. ${lib.sign}`,
    image: 'культура глазами нейросети',
    isUsed: false,
  },
  sport: {
    request: `Найди самую удивительную новость в спорте на сегодняшний день и объясни ее. ${lib.sign}`,
    image: 'спорт глазами нейросети',
    isUsed: false,
  },
  world: {
    request: `Найди самую важную новость в мире на сегодняшний день и объясни ее. ${lib.sign}`,
    image: 'новости глазами нейросети',
    isUsed: false,
  },
  people: {
    request: `что тебя больше всего удивляет в человечесте. Объясни почему. ${lib.sign}`,
    image: 'Самсое большое удивление глазами нейросети',
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
