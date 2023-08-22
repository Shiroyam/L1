function promiseImage(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.onload = () => {
      resolve({
        img,
        url
      });
    };

    img.onerror = () => {
      reject({
        url,
      });
    };

    img.src = url;
  });
}

const url = "https://weblinks.ru/wp-content/uploads/2021/08/1-5.jpeg";

promiseImage(url)
  .then((value) => {
    document.body.append(value.img);
    console.log(value);
  })
  .catch((error) => {
    throw new Error(error);
  });
