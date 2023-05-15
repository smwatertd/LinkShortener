import { makeAutoObservable } from "mobx";

const _normalizeSocket = (socket) => {
  // Приведение сокета к стандартному формату объекта Java Script
  return {
    fullUrl: socket.full_url,
    shortUrl: socket.short_url,
    createdAt: socket.created_at,
    views: socket.views,
  };
};

export default class SocketListStore {
  // Store для хранения данных о списка сокетов
  constructor() {
    this._sockets = [];
    this._socketsCount = -1;
    makeAutoObservable(this);
  }

  removeSocket(index) {
    // Удаления сокета из списка сокетов
    // index - индекс
    this._sockets.splice(index, 1);
    this.setSocketsCount(this.socketsCount - 1);
  }

  setSockets(sockets) {
    this._sockets = sockets.map(socket => _normalizeSocket(socket));
    this.setSocketsCount(sockets.length);
  }

  setSocketsCount(socketsCount) {
    this._socketsCount = socketsCount;
  }

  get sockets() {
    return this._sockets;
  }

  get socketsCount() {
    return this._socketsCount;
  }
}
