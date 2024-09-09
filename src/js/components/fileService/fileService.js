export default class FileService {
  async getAll(callback) {
    // document.documentElement.insertAdjacentHTML("beforeEnd", `<div class="preloader"><div>`);

    const response = await callback(`http://localhost:3000/files`);

    return await this.handlerResponse(response);
  }

  async create(data, callback) {
    const response = await callback(`http://localhost:3000/files`, {
      method: "POST",
      body: data,
    });

    return await this.handlerResponse(response);
  }

  async get(id, callback) {
    const response = await callback(`http://localhost:3000/files/${id}`);

    return await this.handlerResponse(response);
  }

  async delete(id, callback) {
    await callback(`http://localhost:3000/files/${id}`, {
      method: "DELETE",
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
