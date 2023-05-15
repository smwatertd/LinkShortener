import { makeAutoObservable } from "mobx";

export default class RedirectStore {
  // Store для хранения данных о состоянии перенаправления
  constructor() {
    this._isRedirect = false;
    makeAutoObservable(this);
  }

  setIsRedirect(isRedirect) {
    this._isRedirect = isRedirect;
  }

  get isRedirect() {
    return this._isRedirect;
  }
}
