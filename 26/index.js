function recursiveDOM(element) {
  console.log(element);

  // обходим всех детей текущего элемента
  const children = element.children;
  for (let i = 0; i < children.length; i++) {
    // рекурсивно вызываем функцию для каждого ребенка
    recursiveDOM(children[i]);
  }
}

const div = document.querySelector("#div");
recursiveDOM(div);

const div1 = document.querySelector("#div1");
recursiveDOM(div1);
