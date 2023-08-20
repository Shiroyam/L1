/**
 * Преобразование json в linked list
 * @param {json} json
 * @returns {object}
 */
function jsonToLinkedList(json) {
  // проверка на строку
  if (typeof json !== "string") {
    throw new Error("Параметр должен быть строкой JSON");
  }

  const data = JSON.parse(json);

  // проверка на массив
  if (!Array.isArray(data)) {
    throw new Error("JSON должен быть массивом");
  }

  // голова списка
  const head = {
    value: data[0],
    next: null,
  };

  // указатель текущего элемента списка
  let current = head;

  for (let i = 1; i < data.length; i++) {
    // на каждый элемент массива создаем новый узел списка
    const newNode = {
      value: data[i],
      next: null,
    };

    //ставим текущему указателю следующий список
    current.next = newNode;

    //меняем указатель
    current = newNode;
  }

  return head;
}

const json = '[{"name": "Max", "age": 25}, {"name": "Semyon", "age": 30}, {"name": "Artem", "age": 35}]';
console.log(jsonToLinkedList(json));