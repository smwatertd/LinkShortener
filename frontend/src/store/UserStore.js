import { makeAutoObservable } from "mobx";

export default class UserStore {
  constructor() {
    this._user = {};
    this._isAuth = false;
    makeAutoObservable(this);
  }

  setUser(user) {
    this._user = user;
  }

  setIsAuth(isAuth) {
    this._isAuth = isAuth;
  }

  get user() {
    return this._user;
  }

  get isAuth() {
    return this._isAuth;
  }
}
