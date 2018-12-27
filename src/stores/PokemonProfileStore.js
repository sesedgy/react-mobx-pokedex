import { observable, action } from 'mobx';
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
    async getPokemon(name) {
      loaderStore.show();
      this.pokemon = await ApiService.getResult(ApiService.getPromise(`${API_PATHS.GET.POKEMONS_LIST}/${name}`));
      loaderStore.hide();
    }
}

const pokemonsFilteredList = new PokemonProfileStore();
export default pokemonsFilteredList;
