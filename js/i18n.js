// Переводы. Русский текст лежит в разметке, уйгурский подставляется по ключам data-i18n.
// Язык выбирается параметром ?lang=ug, по умолчанию русский.
const TRANSLATIONS = {
  ru: {
    'guests.dear': 'Дорогие',
    'guests.dearHe': 'Дорогой',
    'guests.dearShe': 'Дорогая',
    'guests.and': 'и',
    'rsvp.submit': 'Отправить',
    'rsvp.sending': 'Отправляем…',
    'countdown.days': ['день', 'дня', 'дней'],
    'countdown.hours': ['час', 'часа', 'часов'],
    'countdown.minutes': ['минута', 'минуты', 'минут'],
    'countdown.seconds': ['секунда', 'секунды', 'секунд'],
  },
  ug: {
    'meta.title': 'Имран вә Реана — тойға тәклипнамә',
    'meta.description': 'Имран вә Реананиң тойиға тәклипнамә. 2026-жил 18-өктәбир, Ақмаржан ресторани.',
    'envelope.open': 'Тәклипнамини ечиш',
    'hero.subtitle': 'Тойға тәклипнамә',
    'intro.bismillah': 'Меһриван вә рәһимлик Аллаһниң нами билән',
    'intro.love': 'Муһәббәт&nbsp;— асманниң соғиси, икки қәлбниң бирлишиши&nbsp;— Аллаһниң бәрикити.',
    'intro.invite': 'Қәлбимиздики һаяҗан вә&nbsp;хошаллиқ билән силәрни һаятимизниң әң&nbsp;гөзәл дәқиқилиридин бири&nbsp;— тәғдиримиз бир пүтүн болуп бирлишидиған күнни биз билән тәң бөлүшүшкә тәклип қилимиз.',
    'intro.saveTheDate': 'Save the date',
    'guests.title': 'Қәдирлик меһманлар!',
    'guests.dear': 'Қәдирлик',
    'guests.dearHe': 'Қәдирлик',
    'guests.dearShe': 'Қәдирлик',
    'guests.and': 'вә',
    'guests.wish': 'Бу күн муһәббәт, садақәт вә&nbsp;бәхткә толған һекайиниң башлиниши болсун, силәрниң қатнишишиңлар уни алаһидә нур билән йорутсун.',
    'calendar.month': 'Өктәбир',
    'calendar.mon': 'дү',
    'calendar.tue': 'сә',
    'calendar.wed': 'ча',
    'calendar.thu': 'пә',
    'calendar.fri': 'җү',
    'calendar.sat': 'шә',
    'calendar.sun': 'йә',
    'location.title': 'Мәнзил',
    'location.lead': 'Силәрни мошу мәнзилдә күтимиз:',
    'location.venue': 'Ақмаржан ресторани',
    'location.address': 'Атагелди Исмаилов кочиси, 28',
    'location.map': 'Хәритидин көрүш',
    'program.title': 'Күн программиси',
    'program.gathering': 'Меһманларниң жиғилиши',
    'program.ceremony': 'Мәрасим',
    'program.end': 'Кәчниң ахирлишиши',
    'rsvp.title': 'Меһман анкетиси',
    'rsvp.text': 'Җаваплириңлар тойни тәшкилләшкә ярдәм бериду, анкетини 01.10.2026 күнигичә толдуруп қоюңлар',
    'rsvp.name': 'Исим-фамилиңлар',
    'rsvp.attendance': 'Тойға қатнишаламсиләр?',
    'rsvp.yes': 'Һәә, әлвәттә!',
    'rsvp.no': 'Әпсус, қатнишалмаймән',
    'rsvp.submit': 'Йоллаш',
    'rsvp.sending': 'Йоллиниватиду…',
    'rsvp.done': 'Рәхмәт! Җавабиңлар йезилди.',
    'rsvp.error': 'Җавапни йоллиғили болмиди. Интернетни тәкшүрүп, қайта синап беқиң.',
    'family.title': 'Сайипханлар',
    'family.names': 'Әршат вә&nbsp;Асиям<br>Ренат вә&nbsp;Рошәнгүл',
    'family.wait': 'Тойғичә қалди...',
    'countdown.days': ['күн', 'күн', 'күн'],
    'countdown.hours': ['саат', 'саат', 'саат'],
    'countdown.minutes': ['минут', 'минут', 'минут'],
    'countdown.seconds': ['секунт', 'секунт', 'секунт'],
  },
};

const pageParams = new URLSearchParams(location.search);
const lang = TRANSLATIONS[pageParams.get('lang')] ? pageParams.get('lang') : 'ru';

// t('ключ') — строка на текущем языке с откатом на русский
const t = (key) => TRANSLATIONS[lang][key] ?? TRANSLATIONS.ru[key];

document.documentElement.lang = lang;

if (lang !== 'ru') {
  const dict = TRANSLATIONS[lang];
  const apply = (attr, set) => {
    document.querySelectorAll(`[${attr}]`).forEach((el) => {
      const value = dict[el.getAttribute(attr)];
      if (value !== undefined) set(el, value);
    });
  };
  apply('data-i18n', (el, value) => { el.innerHTML = value; });
  apply('data-i18n-placeholder', (el, value) => { el.placeholder = value; });
  apply('data-i18n-alt', (el, value) => { el.alt = value; });
  apply('data-i18n-aria', (el, value) => { el.setAttribute('aria-label', value); });
  apply('data-i18n-content', (el, value) => { el.content = value; });
}
