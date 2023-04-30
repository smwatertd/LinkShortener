import { makeAutoObservable } from "mobx";

export default class RedirectStore {
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
