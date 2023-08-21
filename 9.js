/**
 * Реализация JSON.stringify()
 * @param {string | array | number | object | null | boolean} value
 * @returns {string}
 */
function stringify(value) {
  //проверка на string
  if (typeof value === "string") {
    return '"' + value + '"';
  }

  //проверка на number, boolean и null
  if (typeof value === "number" || typeof value === "boolean" || value === null) {
    return String(value);
  }

  //проверка на array
  if (Array.isArray(value)) {
    const result = value.map((item) => {
      return stringify(item);
    });

    return "[" + result.join(",") + "]";
  }

  //проверка на object
  if (typeof value === "object") {
    const objectResult = [];

    for (const key in value) {
      //проверка на наличие ключа в объекте
      if (value.hasOwnProperty(key)) {
        const item = stringify(value[key]);
        const jsonKey = '"' + key + '":';

        objectResult.push(jsonKey + item);
      }
    }

    return "{" + objectResult.join(",") + "}";
  }
}

console.log(stringify({}));
console.log(stringify(true));
console.log(stringify("foo"));
console.log(stringify([1, "false", false])); 
console.log(stringify({ x: 5 }));
console.log(stringify([{test: "test"}, {test2: "test2"}]))
console.log(stringify(123))

