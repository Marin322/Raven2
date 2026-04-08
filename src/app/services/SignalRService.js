import * as signalR from "@microsoft/signalr";

class SignalRService {
  connection = null;

  // Метод для запуска соединения
  async startConnection(token) {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl("https://ravenapp.ru/hubs/chatHub", {
        accessTokenFactory: () => token, 
      })
      .withAutomaticReconnect()
      .build();

    try {
      await this.connection.start();
      console.log("SignalR Connected!");
    } catch (err) {
      console.error("SignalR Connection Error: ", err);
    }
  }

  // Подписка на событие получения сообщения
  onReceiveMessage(callback) {
    this.connection?.on("ReceiveMessage", (message) => {
      callback(message);
    });
  }

  // Метод для остановки (при логауте)
  stopConnection() {
    this.connection?.stop();
  }
}

export const signalRService = new SignalRService();