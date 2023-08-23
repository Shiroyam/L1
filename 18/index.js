const loading = document.querySelector("#loading");

function calculateLocalStorageSize() {
  localStorage.clear();
  let data = "";

  try {
    // Заполняем data до возникновения ошибки localStorage
    while (true) {
      data += data.padStart(1024, "x");
      localStorage.setItem("data", data);
    }
  } catch (e) {
    console.log(e);

    loading.style.display = "none";

    const data = localStorage.getItem("data");
    // в utf-8 1 символ = 1 байт
    const dataByte = data.length;
    const dataMegabytee = dataByte / (1024 * 1024);
    const result = `${dataByte} байт ≈ ${dataMegabytee} мегабайт`;

    console.log(result);
    document.body.innerText = result;

    localStorage.clear();
  }
}

calculateLocalStorageSize();
