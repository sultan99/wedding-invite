// Обратный отсчёт до свадьбы. Дата берётся из data-target у .countdown, подписи — из словаря i18n.
const WORDS = [
  t('countdown.days'),
  t('countdown.hours'),
  t('countdown.minutes'),
  t('countdown.seconds'),
];

const plural = (n, [one, few, many]) => {
  const d10 = n % 10;
  const d100 = n % 100;
  if (d10 === 1 && d100 !== 11) return one;
  if (d10 >= 2 && d10 <= 4 && (d100 < 10 || d100 >= 20)) return few;
  return many;
};

const split = (seconds) => [
  Math.floor(seconds / 86400),
  Math.floor(seconds / 3600) % 24,
  Math.floor(seconds / 60) % 60,
  seconds % 60,
];

const init = () => {
  const block = document.querySelector('.countdown');
  if (!block) return;

  const target = new Date(block.dataset.target).getTime();
  const units = [...block.querySelectorAll('.countdown__unit')].map((unit) => ({
    value: unit.querySelector('.countdown__value'),
    label: unit.querySelector('.countdown__label'),
  }));

  const tick = () => {
    const left = Math.max(0, Math.floor((target - Date.now()) / 1000));
    split(left).forEach((value, i) => {
      units[i].value.textContent = i === 0 ? value : String(value).padStart(2, '0');
      units[i].label.textContent = plural(value, WORDS[i]);
    });
  };

  tick();
  setInterval(tick, 1000);
};

init();
