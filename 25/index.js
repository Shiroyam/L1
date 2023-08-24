/**
 * Создание html элемента
 * @param {string} tag - название тэга элемента
 * @param {object} styles - объект с инлайн стилями
 * @param {string} children - вложенные html элементы
 */
function createElement(tag, styles, children) {
  const element = document.createElement(tag);

  // Добавляем стили через Object.assign, т.к мы копируем старые и новые стили и объединяем их в один объект.
  Object.assign(element.style, styles);

  if(children[0] === "<") {
    element.innerHTML = children
  } else {
    element.innerText = children
  }

  document.body.appendChild(element)
}

createElement("div", {color: "red", marginTop: "25px"}, "test")
createElement("div", {color: "green", marginTop: "50px"}, "<div>wrapper<div>children</div></div>")
