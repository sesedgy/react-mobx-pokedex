import { observable, action } from 'mobx';

class LoaderStore {
  constructor() {
    this.isVisible = false;
  }

  @observable
  isVisible;

  @action
  hide() {
    this.isVisible = false;
  }

  @action
  show() {
    this.isVisible = true;
  }
}

const loaderStore = new LoaderStore();
export default loaderStore;
