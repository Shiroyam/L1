const square = document.querySelector("#square");

/**
 * Создание анимации движения
 * @param {string} element - элемент, который будет двигаться
 * @param {{x: number, y: number}} coordinate - координаты для направления движения
 */
function createAnimateMove(element, coordinate) {
  let left = 0;
  let top = 0;

  return function changePosition() {
    // получаем координаты объекта
    const { x, y } = element.getBoundingClientRect();

    // проверяем совпадение координат объекта и точкой назначения
    if (x > coordinate.x) {
      left -= 1;
    } else if (x < coordinate.x) {
      left += 1;
    }

    if (y > coordinate.y) {
      top -= 1;
    } else if (y < coordinate.y) {
      top += 1;
    }

    element.style.transform = `translate(${left}px, ${top}px)`;
    element.style.transform = `translate(${left}px, ${top}px)`;

    // Вызываем специальную функция для обновления кадров на странице, пока координаты совпадут
    if (x !== coordinate.x && y !== coordinate.y) {
      requestAnimationFrame(changePosition);
    }
  };
}

const move = createAnimateMove(square, { x: 750, y: 750 });

move();
