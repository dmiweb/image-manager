import ImageManager from "./components/image-manager/image-manager";

document.addEventListener("DOMContentLoaded", () => {
  const parentEl = document.querySelector(".widget-file-upload");

  const imageManager = new ImageManager(parentEl);

  imageManager.init();
});
