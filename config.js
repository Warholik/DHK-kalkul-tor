var images = document.getElementsByTagName("img");
for (let image of images) {
  image.src = image.src.replace("http://127.0.0.1:5500/", "http://dhk.kifli.tech/");
  console.log(image.src);
}
