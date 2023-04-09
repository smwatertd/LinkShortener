import { makeAutoObservable } from "mobx";

class SocketListStore {
    constructor() {
        this._sockets = [];
        makeAutoObservable(this);
    }

    setSockets(sockets) {
        this._sockets = sockets.map(socket => {
            return {
                fullUrl: socket.full_url,
                shortUrl: socket.short_url,
                createdAt: socket.created_at,
                views: socket.views,
            };
        });
    }

    get sockets() {
        return this._sockets;
    }
}

export default SocketListStore;
