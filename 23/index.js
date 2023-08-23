const input = document.querySelector("#input");
const description = document.querySelector("#description");

function analyzerPassword(password) {
  // оценка надежности
  let score = 0;
  // массив рекомендаций по надежности пароля
  let suggestions = [];

  // цикл, который прогоняет пароль через все проверки
  configOptions.map((value) => {
    if (value.check(password)) {
      score++;
    } else {
      suggestions.push(value.message);
      score--;
    }
  });

  // выдает разные стили в зависимости от выставленных оценок в цикле
  if (score > 2) {
    input.classList.add("input--success");
  } else {
    input.classList.remove("input--success");
  }

  if (score > -1 && score <= 2) {
    input.classList.add("input--medium");
  } else {
    input.classList.remove("input--medium");
  }

  if (score < -1) {
    input.classList.add("input--warning");
  } else {
    input.classList.remove("input--warning");
  }

  // рендерим массив рекомендаций 
  const html = suggestions.map((value) => {
    return `<div class="option">${value}</div>`;
  });

  description.style.display = "flex";
  description.innerHTML = html.join("");
}

input.addEventListener("input", (e) => {
  analyzerPassword(e.target.value);
});

// создаем конфиг для удобной валидации с помощью цикла
const configOptions = [
  {
    check: (password) => validationSpecialСharacter(password),
    message: "включите специальный символ (!@#%^&*(),.?)",
  },
  {
    check: (password) => validationLength(password),
    message: "увеличьте длину вашего пароля",
  },
  {
    check: (password) => validationString(password),
    message: "включить как прописные, так и строчные буквы",
  },
  {
    check: (password) => validationNumber(password),
    message: "включите хотя бы одно число",
  },
];

function validationSpecialСharacter(password) {
  const regex = /[!@#%^&*(),.?]/;

  return regex.test(password);
}

function validationLength(password) {
  const length = password.length;

  return length >= 8;
}

function validationString(password) {
  const regex = /[A-Z]/;

  return regex.test(password);
}

function validationNumber(password) {
  const regex = /[1-9]/;

  return regex.test(password);
}
