import { makeAutoObservable } from "mobx";

export default class LoadingStore {
  constructor() {
    this._isButtonLoading = false;
    this._isPageLoading = false;
    this._isProfileLoading = false;
    makeAutoObservable(this);
  }

  setIsButtonLoading(isLoading) {
    this._isButtonLoading = isLoading;
  }

  setIsPageLoading(isLoading) {
    this._isPageLoading = isLoading;
  }

  setIsProfileLoading(isLoading) {
    this._isProfileLoading = isLoading;
  }

  get isButtonLoading() {
    return this._isButtonLoading;
  }

  get isPageLoading() {
    return this._isPageLoading;
  }

  get isProfileLoading() {
    return this._isProfileLoading;
  }
}
