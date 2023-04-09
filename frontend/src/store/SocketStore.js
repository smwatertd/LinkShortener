import { makeAutoObservable } from "mobx";

class SocketStore {
    constructor() {
        this._fullUrl = "";
        this._shortUrl = "";
        makeAutoObservable(this);
    };

    setFullUrl(fullUrl) {
        this._fullUrl = fullUrl;
    };

    setShortUrl(shortUrl) {
        this._shortUrl = shortUrl;
    };

    get fullUrl() {
        return this._fullUrl;
    };

    get shortUrl() {
        return this._shortUrl;
    };
};

export default SocketStore;
