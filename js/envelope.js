// Конверт на старте: ждём загрузку страницы и шрифтов, по клику открываем и включаем музыку.
// браузер не должен восстанавливать старую позицию прокрутки после перезагрузки
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const envelope = document.getElementById('envelope');
const button = envelope.querySelector('.envelope__button');
const music = document.getElementById('music');

const pageLoaded = new Promise((resolve) => {
  if (document.readyState === 'complete') resolve();
  else window.addEventListener('load', resolve, { once: true });
});

const fontsLoaded = document.fonts ? document.fonts.ready : Promise.resolve();

let ready = false;

Promise.all([pageLoaded, fontsLoaded]).then(() => {
  ready = true;
  button.disabled = false;
});

const open = () => {
  // страница под конвертом всегда открывается с самого верха
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  envelope.classList.add('is-open');
  document.body.classList.remove('is-locked');
  music.volume = 0.4;
  music.play().catch(() => {});
  document.querySelector('.hero__video').play().catch(() => {});
  const backdrop = envelope.querySelector('.envelope__backdrop--left');
  backdrop.addEventListener('transitionend', () => envelope.remove(), { once: true });
};

// открывается кликом в любое место оверлея, но только после загрузки страницы
envelope.addEventListener('click', () => {
  if (ready && !envelope.classList.contains('is-open')) open();
});
