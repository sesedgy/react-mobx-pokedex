import { observable, action, flow } from 'mobx';
import ApiService from '../services/apiService';
import loaderStore from './LoaderStore';
import { API_PATHS } from '../constants';

class PokemonProfileStore {
  constructor() {
    this.pokemon = null;
  }

    @observable
    pokemon;

    @action
    getPokemon = flow(function* getPokemon(name) {
      loaderStore.show();
      this.pokemon = yield ApiService.getResult(ApiService.getPromise(`${API_PATHS.GET.POKEMONS_LIST}/${name}`));
      loaderStore.hide();
    });
}

const pokemonsFilteredList = new PokemonProfileStore();
export default pokemonsFilteredList;
