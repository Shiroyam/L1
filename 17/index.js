const env = {
  key: "a537db0e-06f7-42de-8d3c-2a12ac59e379",
  api: "https://geocode-maps.yandex.ru/1.x",
};

/**
 * Запрос на апи яндекса для получения адреса 
 * @param {string} geocode - адрес
 * @returns {Promise.<object>}
 */
async function getAddress(geocode) {
  const data = await fetch(
    `${env.api}?apikey=${env.key}&geocode=${geocode}&format=json`
  );

  return await data.json();
}

/**
 * Debounce - отложение выполнение функции до тех пор, пока не произойдет период без вызовов.
 * @param {Function} func - функция вызова
 * @param {number} delay - задержка
 * @returns {Function}
 */
function debounce(func, delay) {
  let timerId;
  return function (...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

const input = document.querySelector("#input");
const ul = document.querySelector("#ul");

/**
 * Действие по клик на li
 * @param {Event} e
 * @returns {void}
 */
function handleLi(e) {
  input.value = e.target.innerText
  ul.style.display = "none"
}

/**
 * Действие по вводу данных в инпут
 * @param {Event} e
 * @returns {void}
 */
async function handleInput(e) {
  if (e.target.value.length > 3) {
    const { response } = await getAddress(e.target.value);

    if (response.GeoObjectCollection) {
      const { featureMember } = response.GeoObjectCollection;

      const html = featureMember.map((value) => {
        return `<li id="li">${value.GeoObject.name} ${
          value.GeoObject.description ? `, ${value.GeoObject.description}` : ""
        }</li>`;
      });

      ul.style.display = "block"
      ul.innerHTML = html.join("");

      const li = document.querySelectorAll("#li")

      li.forEach((value) => {
        value.addEventListener("click", handleLi)
      })
    }
  }
}

// установка дебаунса
const debounceHandle = debounce(handleInput, 750);

input.addEventListener("input", (e) => {
  debounceHandle(e);

  if (e.target.value.length < 2) {
    ul.innerHTML = "";
  }
});
