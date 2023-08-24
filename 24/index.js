const table = document.querySelector("#table");
const tbody = document.querySelector("#tbody");

const env = {
  api: "http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true",
};

/**
 * Запрос на на дату
 * @return {{city: string, fname: string, lname: string, state: string, tel: string, zip: string, address: string }}
 */

async function getData() {
  const response = await fetch(env.api);

  const data = await response.json();

  return data;
}

/**
 * Рендеринг строчки таблицы
 * @param {{city: string, fname: string, lname: string, state: string, tel: string, zip: string, address: string }} data
 */
function render(data) {
  const item = (data) => `<tr>
    <td>${data.city}</td> 
    <td>${data.fname}</td> 
    <td>${data.lname}</td> 
    <td>${data.state}</td> 
    <td>${data.tel}</td> 
    <td>${data.zip}</td>
    <td>${data.address}</td>
  </tr>`;

  let html = "";

  data.map((value) => {
    html += item(value);
  });

  tbody.innerHTML = html;
}

/**
 * Создание пагинации для данных
 * @param {{city: string, fname: string, lname: string, state: string, tel: string, zip: string, address: string }} data
 */
function paginateData(data) {
  const pages = Math.ceil(data.length / 50);
  let currentPage = 1;

  /**
   * Вырезаем элементы из общего количество, чтобы их отрендерить
   * @param {number} pageNumber
   */
  function changePage(pageNumber) {
    const startIndex = (pageNumber - 1) * 50;
    const endIndex = pageNumber * 50;
    const itemsShow = data.slice(startIndex, endIndex);

    render(itemsShow);
    currentPage = pageNumber;
  }

  changePage(currentPage);

  /**
   * Прибавляет к текущей странице единицу и вырезает следующие страницы из массива
   */
  function nextPage() {
    // проверка, чтобы пагинация не была больше общего количество страниц
    if (currentPage < pages) {
      changePage(currentPage + 1);
      paginationCount.textContent = Number(paginationCount.textContent) + 1;
    }
  }

  /**
   * Убавляет текущую страницу на единицу и вырезает прошлые страницы из массива
   */
  function prevPage() {
    // проверка, чтобы пагинация не было меньше единицы
    if (currentPage > 1) {
      changePage(currentPage - 1);
      paginationCount.textContent = Number(paginationCount.textContent) - 1;
    }
  }

  return {
    nextPage,
    prevPage,
  };
}

/**
 * Выбираем колонку для сортировки
 */
function sortDataByColumn(column, data) {
  const sortOrder = column.dataset.sort === "asc" ? "desc" : "asc";
  column.dataset.sort = sortOrder;
  sortData(column.dataset.column, sortOrder, data);
}

/**
 * Сортировка данных
 */
function sortData(column, sortOrder, data) {
  const sortFunction = (a, b) => {
    if (sortOrder === "asc") {
      return String(a[column]).localeCompare(b[column]);
    } else {
      return String(b[column]).localeCompare(a[column]);
    }
  };

  render(data.sort(sortFunction));
}

const filterButtons = document.querySelectorAll("#filter");
const paginationNext = document.querySelector("#pagination-next");
const paginationPrev = document.querySelector("#pagination-prev");
const paginationCount = document.querySelector("#pagination-count");

(async function init() {
  const data = await getData();

  const paginate = paginateData(data);

  paginationNext.addEventListener("click", () => {
    paginate.nextPage();
  });

  paginationPrev.addEventListener("click", () => {
    paginate.prevPage();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      button.textContent = button.textContent === "↑" ? "↓" : "↑";
      sortDataByColumn(button, data);
    });
  });
})();
