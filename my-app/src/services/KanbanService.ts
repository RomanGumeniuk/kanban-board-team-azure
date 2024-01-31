type HttpMethod = "GET" | "POST" | "DELETE";

class KanbanService {
  baseUrl: string;

  constructor() {
    this.baseUrl = "https://zsl-functions-net8.azurewebsites.net/api";
  }

  async callFunction(
    endpoint: string,
    method: HttpMethod,
    body: any,
    key: string
  ) {
    const url = `${this.baseUrl}/${endpoint}`;

    let options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-functions-key": key,
      },
    };

    if (method !== "GET") {
      options.body = JSON.stringify(body);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Return the full response object
    return response;
  }

  async deleteTask(taskId: string) {
    const key = "KkUnRlpk5Qt1j2OvJXQyW1OSR42o-pZD5Du86ohos4jiAzFu3zalgQ=="; // deleteTask key
    const response = await this.callFunction(
      `DeleteTask?id=${taskId}`,
      "DELETE",
      null,
      key
    );
    return {
      status: response.status,
      data: response.json(),
    };
  }

  createTask(taskData: any) {
    const key = "XutSsWJtGDPNnlv6DoEsrXv9RKQkvOQfHwDQMJcSrVMtAzFusYIBWg=="; // createTask key
    return this.callFunction("CreateTask", "POST", taskData, key);
  }
  showAllTasks() {
    const key = "QQZdcSbWaxTMtNpKs5biGZatwnNAOWmYnfdDy8-YB-9KAzFuP3mYbw=="; // showAllTasks key
    return this.callFunction("ShowAll", "GET", null, key);
  }

  updateTask(taskId: string, taskData: any) {
    const key = "zCtsI_EdhvXBw7rBWQLCzheaVG6habU1WhVX1ej-cfclAzFuyCan-g=="; // updateTask key
    const endpoint = `EditTask?id=${taskId}&title=${taskData.title}&description=${taskData.description}&column=${taskData.column}&color=${encodeURIComponent(taskData.color)}`;
    return this.callFunction(endpoint, "POST", null, key);
  }
  
  LoginToSite(username: string, password:string){
    const key = "1tiSr5AEQHl_B0InaeyNV27u-bmcv0CbYThzEgJRvsyPAzFuRuUWFg==";
    return this.callFunction("Login","POST", { username, password }, key);
  }
  
}

export default new KanbanService();
