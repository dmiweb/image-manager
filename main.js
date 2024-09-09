/******/ (() => { // webpackBootstrap
/******/ 	"use strict";

;// CONCATENATED MODULE: ./src/js/components/api/createRequest.js
const createRequest = async (url, options = {}) => {
  return await fetch(url, options);
};
/* harmony default export */ const api_createRequest = (createRequest);
;// CONCATENATED MODULE: ./src/js/components/fileService/fileService.js
class FileService {
  async getAll(callback) {
    // document.documentElement.insertAdjacentHTML("beforeEnd", `<div class="preloader"><div>`);

    const response = await callback(`http://localhost:3000/files`);
    return await this.handlerResponse(response);
  }
  async create(data, callback) {
    const response = await callback(`http://localhost:3000/files`, {
      method: "POST",
      body: data
    });
    return await this.handlerResponse(response);
  }
  async get(id, callback) {
    const response = await callback(`http://localhost:3000/files/${id}`);
    return await this.handlerResponse(response);
  }
  async delete(id, callback) {
    await callback(`http://localhost:3000/files/${id}`, {
      method: "DELETE"
    });
  }
  async handlerResponse(response) {
    if (response.status >= 200 && response.status < 300) {
      try {
        return await response.json();
      } catch (e) {
        console.error(e);
      }
    }
  }
}
;// CONCATENATED MODULE: ./src/js/components/gallery/preview-view.js

class PreviewView {
  renderImage(id, name, path) {
    return `
      <article id="${id}" class="item-container">
        <div class="image-container">
          <img src="${path}" class="image">
        </div>
        <span class="name-img">${name.slice(9)}</span>
        <span class="delete-image">X</span>
      </article>
    `;
  }
  deleteImage(e) {
    if (e.target.classList.contains("delete-image")) {
      e.target.closest(".item-container").remove();
    }
  }
}
;// CONCATENATED MODULE: ./src/js/components/widget-file-upload/widget-file-upload.js

class WidgetFileUpload {
  renderWidget(parentEl) {
    const previewElement = `
            <div class="file-container">
              <input type="file" class="file-container__input" accept="image/*">
              <div class="file-container__overlap overlap-content">
                <span class="overlap-content__text">Drag and Drop files here</span>
                <span class="overlap-content__text">or Click to select</span>
              </div>          
            </div>
          `;
    parentEl.insertAdjacentHTML("beforeEnd", previewElement);
  }
}
;// CONCATENATED MODULE: ./src/js/components/image-manager/image-manager.js




class ImageManager {
  constructor(parentEl) {
    this.parentEl = parentEl;
    this.gallery = document.querySelector(".gallery");
    this.fileService = new FileService();
    this.previewView = new PreviewView();
    this.widgetFileUpload = new WidgetFileUpload();
    this.getDropFile = this.getDropFile.bind(this);
    this.handlerInputFile = this.handlerInputFile.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }
  getDropFile(e) {
    e.preventDefault();
    const overlapElement = document.querySelector(".file-container__overlap");
    if (e.target !== overlapElement) return;
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    const typeFile = e.dataTransfer.files[0].type;
    if (!typeFile.startsWith("image")) return;
    this.sendFile(file);
  }
  handlerInputFile() {
    const fileInput = document.querySelector(".file-container__input");
    fileInput.dispatchEvent(new MouseEvent("click"));
    fileInput.addEventListener("change", () => {
      if (fileInput.files && fileInput.files[0]) {
        const image = fileInput.files[0];
        fileInput.value = null;
        this.sendFile(image);
      }
    });
  }
  async sendFile(image) {
    const data = new FormData();
    data.append("file", image);
    const {
      file
    } = await this.fileService.create(data, api_createRequest);
    await this.getFile(file.id);
  }
  async getAllFiles() {
    const {
      files
    } = await this.fileService.getAll(api_createRequest);
    files.forEach(file => {
      const imageElement = this.previewView.renderImage(file.id, file.filename, file.path);
      this.gallery.insertAdjacentHTML("beforeEnd", imageElement);
    });
  }
  async getFile(id) {
    const {
      file
    } = await this.fileService.get(id, api_createRequest);
    this.addPreviewImage(file);
  }
  addPreviewImage(file) {
    const imageElement = this.previewView.renderImage(file.id, file.filename, file.path);
    this.gallery.insertAdjacentHTML("beforeEnd", imageElement);
  }
  async deleteFile(e) {
    if (e.target.classList.contains("delete-image")) {
      const id = e.target.closest(".item-container").id;
      await this.fileService.delete(id, api_createRequest);
      this.previewView.deleteImage(e);
    }
  }
  init() {
    this.widgetFileUpload.renderWidget(this.parentEl);
    document.querySelector(".file-container").addEventListener("click", this.handlerInputFile);
    document.documentElement.addEventListener("dragover", e => e.preventDefault());
    document.documentElement.addEventListener("drop", this.getDropFile);
    document.documentElement.addEventListener("click", this.deleteFile);
    this.getAllFiles();
  }
}
;// CONCATENATED MODULE: ./src/js/app.js

document.addEventListener("DOMContentLoaded", () => {
  const parentEl = document.querySelector(".widget-file-upload");
  const imageManager = new ImageManager(parentEl);
  imageManager.init();
});
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;