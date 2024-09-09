import "./widget-file-upload.css";

export default class WidgetFileUpload {
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
