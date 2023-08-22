/**
 * Реализация JSON.parse()
 * @param {string} text
 * @returns {string | array | number | object | null | boolean}
 */
function parse(text) {
  // валидация на не строки
  if (typeof text !== "string") {
    throw new Error("Невалидный JSON");
  }

  // убираем отступы
  const trimText = text.trim();

  // проверка на null
  if (trimText === "null") {
    return null;
  }

  // проверка на number
  if (!!Number(trimText)) {
    return Number(trimText);
  }

  // проверка на string
  if (trimText[0] === '"') {
    const string = text.slice(1, -1);
    return string;
  }

  // проверка на boolean
  if (trimText === "true" || trimText === "false") {
    return trimText === "true";
  }

  // если array пустой
  if (text === "[]") {
    return [];
  }

  // проверка на array
  if (text[0] === "[") {
    return (
      text
        // убираем скобки
        .slice(1, -1)
        // разбиваем элементы на массив по ,
        .split(",")
        // парсим все элементы с помощью рекурсии
        .map((value) => parse(value))
    );
  }

  // если object пустой
  if (trimText === "{}") {
    return {};
  }

  // проверка на object
  if (trimText[0] === "{") {
    return (
      text
        // убираем скобки
        .slice(1, -1)
        // разбиваем элементы на массив по ,
        .split(",")
        .reduce((acc, item) => {
          const index = item.indexOf(":"); // нахождение индекса разделителя между ключом и значением
          const key = item.slice(0, index); // выбираем ключ из строки
          const value = item.slice(index + 1); // выбираем значение ключа из строки
          acc[parse(key)] = parse(value); // прогоняем ключи и значения рекурсии, добавляем в объект
          return acc;
        }, {})
    );
  }
}

console.log(parse("true"));
console.log(parse('"foo"'));
console.log(parse("[1, 5,false]"));
console.log(parse("null"));
console.log(parse("123"));
console.log(parse('{"test":"test"}')); 
console.log(parse('[{"test":"test"},{"test2":"test2"}]')); 

console.log(typeof parse("true"), "true");
console.log(typeof parse('"foo"'), '"foo"');
console.log(typeof parse("[1, 5,false]"), "[1, 5,false]");
console.log(typeof parse("null"), "null");
console.log(typeof parse("123"), "123");
console.log(typeof parse('{"test":"test"}'), '{"test":"test"}'); 
console.log(typeof parse('[{"test":"test"},{"test2":"test2"}]'), '[{"test":"test"},{"test2":"test2"}]'); 
