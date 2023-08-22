async function callAsyncFunctions(arr) {
  for (const func of arr) {
    await func().then((value) => {
      return console.log(value);
    });
  }
}

async function func1() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("func 1");
    }, 100);
  });
}

async function func2() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("func 2");
    }, 100);
  });
}

async function func3() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("func 3");
    }, 100);
  });
}

const arr = [func1, func2, func3];

callAsyncFunctions(arr);
