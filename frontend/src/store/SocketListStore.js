import { makeAutoObservable } from "mobx";

import { normalizeShortUrl } from "../utils/LinksUtils";

export default class SocketListStore {
  constructor() {
    this._socketList = [];
    this._firstSocketIndex = 0;
    this._lastSocketIndex = 0;
    makeAutoObservable(this);
  }

  setSocketList(socketList) {
    let index = 0;
    this._socketList  = socketList
      .map(socket => {
        index += 1;
        return {
          index,
          fullUrl: socket.full_url,
          shortUrl: normalizeShortUrl(socket.short_url),
          createdAt: socket.created_at,
          views: socket.views,
        };
      });
  }

  setFirstSocketIndex(socketIndex) {
    this._firstSocketIndex = socketIndex;
  }

  setLastSocketIndex(socketIndex) {
    this._lastSocketIndex = socketIndex;
  }

  get socketList() {
    return this._socketList;
  }

  get firstSocketIndex() {
    return this._firstSocketIndex;
  }

  get lastSocketIndex() {
    return this._lastSocketIndex;
  }
};
