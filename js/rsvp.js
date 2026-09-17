// Анкета: отправляет ответ в Google Forms без перехода на страницу Google.
// Адрес формы и имена полей (entry.XXXX) заданы прямо в разметке формы,
// поэтому без JS форма тоже работает — просто откроется страница «Ответ записан» от Google.
const form = document.querySelector('.rsvp__form');
const done = document.querySelector('.rsvp__done');
const error = document.querySelector('.rsvp__error');
const submit = form.querySelector('.rsvp__submit');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  submit.disabled = true;
  submit.textContent = t('rsvp.sending');
  error.hidden = true;

  try {
    // Google не отдаёт CORS-заголовки, поэтому запрос идёт в режиме no-cors:
    // ответ прочитать нельзя, но запись в форму попадает.
    await fetch(form.action, {
      method: 'POST',
      mode: 'no-cors',
      body: new URLSearchParams(new FormData(form)),
    });
    form.hidden = true;
    done.hidden = false;
  } catch {
    submit.disabled = false;
    submit.textContent = t('rsvp.submit');
    error.hidden = false;
  }
});
