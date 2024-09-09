import "./preview-view.css";

export default class PreviewView {
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
