localStorage.clear()

function getLocalStorageSize() {
  let totalSize = 0;

  for (let key in localStorage) {
    if (localStorage.hasOwnProperty(key)) {
      // учитываем размер ключа и значения
      totalSize += localStorage[key].length + key.length;
    }
  }

  // переводим в мб
  return totalSize / (1024 * 1024);
}

function setItemLocalStorage(value) {
  const key = Math.random()
  const keyLength = key.toString().length
  
  localStorage.setItem(key, value);
  console.log(`текущая строка заняла ${Number(value.length) + Number(keyLength)} байт`);
}

const btn = document.querySelector("#button");
const input = document.querySelector("#input");

btn.addEventListener("click", () => {
  setItemLocalStorage(input.value);
  console.log(getLocalStorageSize());
  input.value = "";
});
