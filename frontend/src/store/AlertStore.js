import { makeAutoObservable } from "mobx";

export default class AlertStore {
  constructor() {
    this._isAlert = false;
    this._alertInfo = {};
    makeAutoObservable(this);
  }

  setIsAlert(isAlert) {
    this._isAlert = isAlert;
  }

  setAlertInfo(alertInfo) {
    this._alertInfo = alertInfo?.response?.data;
  }

  get isAlert() {
    return this._isAlert;
  }

  get alertInfo() {
    return this._alertInfo;
  }
}
