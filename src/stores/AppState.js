import { observable, computed, action } from 'mobx';
import { API_PATHS } from '../constants';
import ApiService from '../services/apiService';
import loaderStore from './LoaderStore';

class AppState {
  @observable
  pokemonsUrlsList = [];

  @observable
  typesUrlsList = [];

  @action
  async initAppState() {
    loaderStore.show();
    const promisesList = [ApiService.getPromise(API_PATHS.GET.POKEMONS_FULL_LIST),
      ApiService.getPromise(API_PATHS.GET.TYPES_LIST)];
    const results = await ApiService.getResultsList(promisesList);
    this.pokemonsUrlsList = results[0].results;
    this.typesUrlsList = results[1].results;
    loaderStore.hide();
  }

  @computed
  get pokemonsCount() {
    return this.pokemonsUrlsList.length;
  }
}

const appState = new AppState();
export default appState;
