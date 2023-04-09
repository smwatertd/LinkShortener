import { makeAutoObservable } from "mobx";

class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._sockets = [];
        makeAutoObservable(this);
    };

    setIsAuth(isAuth) {
        this._isAuth = isAuth;
    };

    setUser(user) {
        this._user = user;
    };

    setSockets(sockets) {
        this._sockets = sockets;
    };

    get isAuth() {
        return this._isAuth;
    };

    get user() {
        return this._user;
    };

    get sockets() {
        return this._sockets;
    }
};

export default UserStore;
