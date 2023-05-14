import { makeAutoObservable } from "mobx";

const _normalizeSocket = (socket) => {
  return {
    fullUrl: socket.full_url,
    shortUrl: socket.short_url,
    createdAt: socket.created_at,
    views: socket.views,
  };
};

export default class SocketListStore {
  constructor() {
    this._sockets = [];
    this._socketsCount = -1;
    makeAutoObservable(this);
  }

  removeSocket(index) {
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
