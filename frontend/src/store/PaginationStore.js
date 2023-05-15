import { makeAutoObservable } from "mobx";

export default class PaginationStore {
  // Store для хранения данных о пагинации
  constructor() {
    this._setDefaultState();
    makeAutoObservable(this);
  }

  _setDefaultState() {
    this._itemsCount = 0;
    this._firstItemIndex = 0;
    this._page = 1;
    this._pageSize = 10;
    this._pagesCount = 0;
  }

  setItemsCount(itemsCount) {
    this.setPagesCount(Math.ceil(itemsCount / this._pageSize));
    this._itemsCount = itemsCount;
  }

  setFirstItemIndex(index) {
    this._firstItemIndex = index;
  }

  setPage(page) {
    if (!page) {
      this._setDefaultState();
      return;
    }

    const firstItemIndex = this._pageSize * (page - 1);
    this.setFirstItemIndex(firstItemIndex);
    this._page = page;
  }

  setPageSize(pageSize) {
    if (!pageSize) {
      this._setDefaultState();
      return;
    }

    this._pageSize = pageSize;
  }

  setPagesCount(pagesCount) {
    this._pagesCount = pagesCount;
  }

  get itemsCount() {
    return this._itemsCount;
  }

  get firstItemIndex() {
    return this._firstItemIndex;
  }

  get page() {
    return this._page;
  }

  get pageSize() {
    return this._pageSize;
  }

  get pagesCount() {
    return this._pagesCount;
  }
}
