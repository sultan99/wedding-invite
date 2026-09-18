// Персонализация по параметрам ссылки:
//   ?Султан&Гульзара  или  ?guest=Султан,Гульзара — обращение по именам и имя в анкете (разделитель — запятая)
//   пробел внутри имени передаётся плюсом: ?Максум+ака&Рошангуль+ада
//   ?music=ar | ?music=ru   — арабская или русская музыка на фоне вместо основной
//   ?m | ?f                  — род обращения для одного имени: Дорогой / Дорогая (иначе угадывается по имени)
const MUSIC = {
  ar: 'media/background-music-ar.mp3',
  ru: 'media/background-music-ru.mp3',
};

const SERVICE_PARAMS = ['lang', 'music', 'guest', 'm', 'f'];

const guestNames = () => {
  const names = [];
  for (const [key, value] of pageParams) {
    if (key === 'guest') names.push(...value.split(',')); // разделитель только запятая
    else if (value === '' && !SERVICE_PARAMS.includes(key)) names.push(key); // ?guest=Имя&ВтороеИмя
  }
  return names.map((name) => name.replace(/["'«»]/g, '').trim()).filter(Boolean);
};

const greeting = (names) => {
  const joined = names.join(` ${t('guests.and')} `);
  if (names.length > 1) return `${t('guests.dear')} ${joined}!`;
  // род: явно из ссылки (&f / &m), иначе по первому слову: «Максум ака» — он, «Рошангуль» — она
  const feminine = pageParams.has('f') ? true
    : pageParams.has('m') ? false
    : /[ая]$|гу[лү]ь?$/i.test(names[0].split(/\s+/)[0]);
  return `${feminine ? t('guests.dearShe') : t('guests.dearHe')} ${joined}!`;
};

const names = guestNames();
if (names.length) {
  document.querySelector('.guests__title').textContent = greeting(names);
  document.querySelector('.rsvp__form input[type="text"]').value = names.join(` ${t('guests.and')} `);
}

const track = MUSIC[pageParams.get('music')];
if (track) document.getElementById('music').src = track;
