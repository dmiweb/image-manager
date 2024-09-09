import createRequest from "../api/createRequest";
import FileService from "../fileService/fileService";
import PreviewView from "../gallery/preview-view";
import WidgetFileUpload from "../widget-file-upload/widget-file-upload";

export default class ImageManager {
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

    const { file } = await this.fileService.create(data, createRequest);

    await this.getFile(file.id);
  }

  async getAllFiles() {
    const { files } = await this.fileService.getAll(createRequest);

    files.forEach((file) => {
      const imageElement = this.previewView.renderImage(
        file.id,
        file.filename,
        file.path
      );

      this.gallery.insertAdjacentHTML("beforeEnd", imageElement);
    });
  }

  async getFile(id) {
    const { file } = await this.fileService.get(id, createRequest);

    this.addPreviewImage(file);
  }

  addPreviewImage(file) {
    const imageElement = this.previewView.renderImage(
      file.id,
      file.filename,
      file.path
    );

    this.gallery.insertAdjacentHTML("beforeEnd", imageElement);
  }

  async deleteFile(e) {
    if (e.target.classList.contains("delete-image")) {
      const id = e.target.closest(".item-container").id;

      await this.fileService.delete(id, createRequest);

      this.previewView.deleteImage(e);
    }
  }

  init() {
    this.widgetFileUpload.renderWidget(this.parentEl);

    document
      .querySelector(".file-container")
      .addEventListener("click", this.handlerInputFile);
    document.documentElement.addEventListener("dragover", (e) =>
      e.preventDefault()
    );
    document.documentElement.addEventListener("drop", this.getDropFile);
    document.documentElement.addEventListener("click", this.deleteFile);

    this.getAllFiles();
  }
}
