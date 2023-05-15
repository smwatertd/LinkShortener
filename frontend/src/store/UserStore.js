import { makeAutoObservable } from "mobx";

export default class UserStore {
  // Store для хранения данных о пользователе
  constructor() {
    this._isAuth = false;
    makeAutoObservable(this);
  }

  setIsAuth(isAuth) {
    this._isAuth = isAuth;
  }

  get isAuth() {
    return this._isAuth;
  }
}
