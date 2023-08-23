let count = 0;

function callWrite() {
  document.write('<script>callWrite()<\/script>');
  return count++
}

console.log(callWrite()) //21 ограничение браузера, чтобы не сломать браузер
