// для работы клиента  нужно запустить сервер: node server.js
// index.html нужно запускать через live server: https://github.com/ritwickdey/vscode-live-server-plus-plus(http://127.0.0.1:5500/19/index.html)

import {
  Config,
  Connect,
} from "./node_modules/@vkontakte/superappkit/dist/index.js";

Config.init({
  appId: 51736145,

  appSettings: {
    agreements: "",
    promo: "",
    vkc_behavior: "",
    vkc_auth_action: "",
    vkc_brand: "",
    vkc_display_mode: "",
  },
});

const redirectAuthHandler = () =>
  Connect.redirectAuth({
    url: "http://127.0.0.1:5500/19/index.html",
    state: "",
    source: "",
    action: undefined,
    screen: undefined,
  });

const vkBtn = document.querySelector("#vk");

vkBtn.addEventListener("click", redirectAuthHandler);

/**
 * Метод, который считает размер всего localStorage
 */
function getLocalStorageSize() {
  let totalSize = 0;

  for (var key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      // учитываем размер ключа и значения
      totalSize += localStorage[key].length + key.length;
    }
  }

  // переводим в мб
  return totalSize / (1024 * 1024);
}

/**
 * Реализация кэширование данных, которые сохраняются в localStorage.
 */
function createCacheLocalStorage() {
  /**
   * Метод, который создает кэш
   * @param {string} key - ключ доступа к кэшу
   * @param {Array} value - содержимое кэша
   * @param {number} ttl - время жизни кэша в мс
   */
  function set(key, value, ttl = 0) {
    const expirationTime = ttl > 0 ? Date.now() + ttl : 0;
    const cacheEntry = { value, expirationTime };
    localStorage.setItem(key, JSON.stringify(cacheEntry));
  }

  /**
   * Метод, получение кэша
   * @param {string} key - ключ доступа к кэшу
   */
  function get(key) {
    const cacheEntry = JSON.parse(localStorage.getItem(key));

    // проверка истекло ли время
    if (
      cacheEntry &&
      (cacheEntry.expirationTime === 0 ||
        cacheEntry.expirationTime > Date.now())
    ) {
      return cacheEntry.value;
    }

    // если время истекло, то сторэдж очищается
    localStorage.removeItem(key);
    return null;
  }

  /**
   * Метод, удаление кэша
   * @param {string} key - ключ доступа к кэшу
   */
  function remove(key) {
    localStorage.removeItem(key);
  }

  /**
   * Метод, который добавляет новое значение в кэш, мутирующий метод
   * @param {string} key - ключ доступа к кэшу
   * @param {{text: string, likes: string, views: string, comments: string, reposts: string}} newValue
   */
  function addItem(key, newValue) {
    const obj = JSON.parse(localStorage.getItem(key));
    const size = getLocalStorageSize()

    console.log(size)

    // если localStorage больше 3.9мб то мы удаляем 20 первых постов.(оставил память под другие данные)
    if (size > 3.9) {
      for (let i = 0; i < 20; i++) {
        shiftItem("wall");
      }
    }

    if (obj) {
      obj.value = [...obj.value, ...newValue];

      localStorage.setItem(key, JSON.stringify(obj));
    }
  }

  /**
   * Метод, который удаляет первый элемент массива, мутирующий метод
   * @param {string} key - ключ доступа к кэшу
   */
  function shiftItem(key) {
    const obj = JSON.parse(localStorage.getItem(key));

    if (obj) {
      obj.value.shift();

      localStorage.setItem(key, JSON.stringify(obj));
    }
  }

  return {
    set,
    get,
    remove,
    addItem,
    shiftItem,
  };
}

/**
 * Функция вытаскивает из url ответ от vkid, получаем из нее silentToken и uuid
 * @param {string} url
 */
function extractTokens(url) {
  const params = new URLSearchParams(url.slice(1));

  const payload = JSON.parse(decodeURIComponent(params.get("payload")));

  const silentToken = payload.token;
  const uuid = payload.uuid;

  return {
    silentToken,
    uuid,
  };
}

/**
 * Запрос на обмен silentToken на accessToken
 * @param {string} tokens - silentToken
 */
async function auth(tokens) {
  const response = await fetch("http://localhost:5000/api/auth", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tokens),
  });

  const data = await response.json();

  if (!data.error) {
    localStorage.setItem("access_token", JSON.stringify(data.response));
  }
}

/**
 * Запрос на посты с сервера
 * @param {string} access_token - токен авторизации
 * @param {number} offset - смещение, необходимое для выборки определённого подмножества записей
 * @returns {Array.<{text: string, likes: string, views: string, comments: string, reposts: string}>}
 */
async function getWall(access_token, offset) {
  const response = await fetch(`http://localhost:5000/api/wall`, {
    cache: "force-cache",
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ownerId: -1, access_token, offset: offset }),
  });

  return await response.json();
}

// нужен для смещение по выборки определённого подмножества записей
let offset = 0;
const cache = createCacheLocalStorage();

// infinity scroll реализованный с помощью браузерного api IntersectionObserver
const observer = new IntersectionObserver((entries) => {
  entries.forEach(async (entry) => {
    if (entry.isIntersecting) {
      const token = JSON.parse(
        localStorage.getItem("access_token")
      ).access_token;

      offset += 20;

      const data = await getWall(token, offset);

      cache.addItem("wall", data.response.items);

      postHTML(data.response.items);

      observer.unobserve(entry.target);
    }
  });
});

/**
 * Рендеринг постов
 * @param {Array.<{text: string, likes: string, views: string, comments: string, reposts: string}>} data
 * @returns {void}
 */
function postHTML(data) {
  const html = data.map(({ text, likes, views, comments, reposts }) => {
    return `<li class="post">
      <div class="text">${text}</div>
      <div class="info">
        <div class="likes">лайки: ${likes?.count}</div>
        <div class="views">просмотры: ${views?.count}</div>
        <div class="comments">комменты: ${comments?.count}</div>
        <div class="comments">репосты: ${reposts?.count}</div>
      </div>
    </li>`;
  });

  const ul = document.querySelector("#wrapper");
  ul.insertAdjacentHTML("beforeend", html.join(""));

  const post = document.querySelector(".post:last-child");
  observer.observe(post);
}

(async function init() {
  // проверяем если кэш и рендерим без выполнение оставшихся проверок
  if (cache.get("wall")) {
    vkBtn.style.display = "none";

    return postHTML(cache.get("wall"));
  }

  // проверяем если пришел токен после авторизации через vkid и сразу делаем запрос на авторизацию
  if (
    Boolean(window.location.search) &&
    !localStorage.getItem("access_token")
  ) {
    const tokens = extractTokens(window.location.search);

    await auth(tokens);
  }

  // если токен есть и кэш пустой, то бы делаем запрос на посты и сохраняем их в кэш
  if (localStorage.getItem("access_token")) {
    vkBtn.style.display = "none";

    const token = JSON.parse(localStorage.getItem("access_token")).access_token;

    const data = await getWall(token, offset);

    // выставляем сохранение кэша на 5 минут
    cache.set("wall", data.response.items, 300000);

    postHTML(data.response.items);
  }
})();
