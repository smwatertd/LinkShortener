import { makeAutoObservable } from "mobx";

import { normalizeShortUrl } from "../utils/LinksUtils";

export default class SocketListStore {
  constructor() {
    this._socketList = [];
    makeAutoObservable(this);
  }

  setSocketList(socketList) {
    this._socketList = socketList
      .map(socket => {
        return {
          fullUrl: socket.full_url,
          shortUrl: normalizeShortUrl(socket.short_url),
          createdAt: socket.created_at,
          views: socket.views,
        };
      });
  }

  get socketList() {
    return this._socketList;
  }
};
