// Персонализация по параметрам ссылки:
//   ?guest=Султан&Гульзара  или  ?guest=Султан,Гульзара — обращение по именам и имя в анкете
//   ?music=ar | ?music=ru   — арабская или русская музыка на фоне вместо основной
const MUSIC = {
  ar: 'media/background-music-ar.mp3',
  ru: 'media/background-music-ru.mp3',
};

const SERVICE_PARAMS = ['lang', 'music', 'guest'];

const guestNames = () => {
  const names = [];
  for (const [key, value] of pageParams) {
    if (key === 'guest') names.push(...value.split(/\s*[,;|]\s*|\s+и\s+|\s+вә\s+/));
    else if (value === '' && !SERVICE_PARAMS.includes(key)) names.push(key); // ?guest=Имя&ВтороеИмя
  }
  return names.map((name) => name.replace(/["'«»]/g, '').trim()).filter(Boolean);
};

const greeting = (names) => {
  const joined = names.join(` ${t('guests.and')} `);
  if (names.length > 1) return `${t('guests.dear')} ${joined}!`;
  const feminine = /[ая]$/i.test(names[0]);
  return `${feminine ? t('guests.dearShe') : t('guests.dearHe')} ${joined}!`;
};

const names = guestNames();
if (names.length) {
  document.querySelector('.guests__title').textContent = greeting(names);
  document.querySelector('.rsvp__form input[type="text"]').value = names.join(` ${t('guests.and')} `);
}

const track = MUSIC[pageParams.get('music')];
if (track) document.getElementById('music').src = track;
