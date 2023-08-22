const book = {
  title: "Государство и революция",
  author: "Ленин",
  year: "1918",

  /**
   * Метод для получения заголовка
   * @returns {string}
   */
  getTitle: function () {
    return this.title;
  },

  /**
   * Метод для получения автора
   * @returns {string}
   */
  getAuthor: function () {
    return this.author;
  },

  /**
   * Метод для получения года
   * @returns {string}
   */
  getYear: function () {
    return this.year;
  },

  /**
   * Метод для получения всех полей
   * @returns {object.<string>}
   */
  getValue: function () {
    return {
      title: this.title,
      author: this.author,
      year: this.year,
    };
  },

  /**
   * Метод для смены заголовка
   * @param {string} - данные для смены полей
   * @returns {string}
   */
  changeTitle: function (title) {
    return (this.title = title);
  },

  /**
   * Метод для смены автора
   * @param {string} - данные для смены полей
   * @returns {string}
   */
  changeAuthor: function (author) {
    return (this.author = author);
  },

  /**
   * Метод для смены года
   * @param {string} - данные для смены полей
   * @returns {string}
   */
  changeYear: function (year) {
    return (this.year = year);
  },

  /**
   * Метод для смены всех полей
   * @param {object.<string>} - данные для смены полей
   * @returns {object.<string>}
   */
  changeValue: function ({ title, author, year }) {
    this.title = title;
    this.author = author;
    this.year = year;

    return this.getValue();
  },
};

console.log(book.getValue());
console.log(book.getTitle());
console.log(book.getAuthor());
console.log(book.getYear());

const data = {
  title: "Материализм и эмпириокритицизм",
  author: "Ленин",
  year: "1909",
};
console.log(book.changeValue(data));
console.log(book.changeTitle("Что делать?"));
console.log(book.changeAuthor("Ленин"));
console.log(book.changeYear("1902"));
console.log(book.getValue());
