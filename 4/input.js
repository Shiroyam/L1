const formatter = require("./formatter.js");

console.log(formatter(112, ["сообщение", "сообщения", "сообщений"]));
console.log(formatter(12, ["сообщение", "сообщения", "сообщений"]));
console.log(formatter(1, ["сообщение", "сообщения", "сообщений"]));
console.log(formatter(1024, ["пользователь", "пользователя", "пользователей"]));
console.log(formatter(1026, ["пользователь", "пользователя", "пользователей"]));
console.log(formatter(121, ["пользователь", "пользователя", "пользователей"]));