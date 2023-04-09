import { makeAutoObservable } from "mobx";

class RedirectStore {
    constructor() {
        this._isRedirect = false;
        makeAutoObservable(this);
    };

    setIsRedirect(isRedirect) {
        this._isRedirect = isRedirect;
    };

    get isRedirect() {
        return this._isRedirect;
    };
};

export default RedirectStore;
