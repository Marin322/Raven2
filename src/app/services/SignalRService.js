import * as signalR from "@microsoft/signalr";

class SignalRService {
  connection = null;
  isConnecting = false;

  async startConnection(token) {
    // Защита от повторного подключения
    if (this.isConnecting) {
      console.log("⚠️ Connection already in progress, skipping");
      return;
    }

    if (this.connection?.state === signalR.HubConnectionState.Connected) {
      console.log("✅ Already connected, ID:", this.connection.connectionId);
      return;
    }

    if (!token) {
      console.error("❌ No token provided!");
      return;
    }

    this.isConnecting = true;

    try {
      // Вариант 1: Токен в URL (надёжнее для WebSockets)
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl(`https://ravenapp.ru/hubs/chat?access_token=${token}`)
        .withAutomaticReconnect([0, 2000, 5000, 10000]) // Кастомные интервалы переподключения
        .configureLogging(signalR.LogLevel.Information) // Включаем логи
        .build();

      // Логируем все события соединения
      this.setupConnectionLogging();

      await this.connection.start();
      console.log("🚀 SignalR Connected! ID:", this.connection.connectionId);
      
    } catch (err) {
      console.error("❌ Connection failed:", err);
      
      // Если первый способ не сработал, пробуем альтернативный
      console.log("🔄 Trying alternative connection method...");
      await this.tryAlternativeConnection(token);
      
    } finally {
      this.isConnecting = false;
    }
  }

  async tryAlternativeConnection(token) {
    try {
      // Вариант 2: Long Polling + accessTokenFactory
      this.connection = new signalR.HubConnectionBuilder()
        .withUrl("https://ravenapp.ru/hubs/chat", {
          accessTokenFactory: () => token,
          transport: signalR.HttpTransportType.LongPolling, // Только Long Polling
          withCredentials: true
        })
        .withAutomaticReconnect()
        .build();

      this.setupConnectionLogging();
      await this.connection.start();
      console.log("🚀 Connected via Long Polling! ID:", this.connection.connectionId);
      
    } catch (err) {
      console.error("❌ Alternative connection also failed:", err);
      this.connection = null;
    }
  }

  setupConnectionLogging() {
    if (!this.connection) return;

    this.connection.onreconnecting((error) => {
      console.log("🔄 Reconnecting...", error);
    });

    this.connection.onreconnected((connectionId) => {
      console.log("✅ Reconnected! ID:", connectionId);
    });

    this.connection.onclose((error) => {
      console.log("🔴 Connection closed", error);
      this.connection = null;
    });
  }

  onReceiveMessage(callback) {
    if (!this.connection) {
      console.warn("⚠️ Cannot subscribe - no connection");
      return;
    }
    
    this.connection.on("ReceiveMessage", (message) => {
      console.log("📨 Received message:", message);
      callback(message);
    });
  }

  async stopConnection() {
    if (this.connection) {
      try {
        await this.connection.stop();
        console.log("👋 Connection stopped");
      } catch (err) {
        console.error("Error stopping connection:", err);
      } finally {
        this.connection = null;
      }
    }
  }

  // Добавим метод для проверки состояния
  getState() {
    return this.connection?.state;
  }
}

export const signalRService = new SignalRService();