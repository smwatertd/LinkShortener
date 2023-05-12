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
    makeAutoObservable(this);
  }

  setSockets(sockets) {
    this._sockets = sockets.map(socket => _normalizeSocket(socket));
  }

  get sockets() {
    return this._sockets;
  }

  removeSocket(index) {
    this._sockets.splice(index, 1);
  }
}
