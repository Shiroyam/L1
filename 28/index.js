/**
 * Создание темплейта
 * @param {Element | null} parent - родительский элемент темплейта
 * @param {string} content - контент, который будет в темплейта
 * @returns {void}
 */
function createTemplate(parent, content) {
  const template = document.createElement('template');

  template.innerHTML = content || "<div>template</div>"

  parent ? parent.appendChild(template.content) : document.body.appendChild(template.content)
  
}

createTemplate();

const div = document.querySelector("#div")
const content = "<div>ContentChild</div>"
createTemplate(div, content)