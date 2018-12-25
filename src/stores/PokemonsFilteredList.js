import { observable, action } from 'mobx';
import { API_PATHS } from '../constants';
import ApiService from '../services/apiService';
import appState from './AppState';
import loaderStore from './LoaderStore';

class PokemonsFilteredList {
  constructor() {
    this.list = [];
  }

  @observable
  list;

  @observable
  filteredUrlsListLength;

  static filterByPage(list, offset = 0, limit = 10) {
    return list.slice(offset, offset + limit);
  }

  @action
  async filterByPageOnServer(offset = 1, limit = appState.pokemonsCount) {
    loaderStore.show();
    const promisesList = [];
    const newOffset = Number(offset);
    const newLimit = Number(limit) + newOffset;
    for (let i = newOffset; i < newLimit; i += 1) {
      promisesList.push(ApiService.getByFullUrl(appState.pokemonsUrlsList[i].url));
    }
    this.list = await ApiService.getList(promisesList);
    loaderStore.hide();
  }

  @action
  async filterByName(name, offset, limit) {
    loaderStore.show();
    let promisesList = [];
    let filteredPokemonsNumbers = [];
    const nameLowerCase = name.toLowerCase();
    appState.pokemonsUrlsList.forEach((item, index) => {
      if (item.name.toLowerCase().indexOf(nameLowerCase) === 0) {
        filteredPokemonsNumbers.push(index + 1);
      }
    });
    this.filteredUrlsListLength = filteredPokemonsNumbers.length;
    filteredPokemonsNumbers = PokemonsFilteredList
      .filterByPage(filteredPokemonsNumbers, offset, limit);
    promisesList = filteredPokemonsNumbers.map(number => ApiService.get(`${API_PATHS.GET.POKEMONS_LIST}/${number}`));
    this.list = await ApiService.getList(promisesList);
    loaderStore.hide();
  }

  @action
  async filterByType(typeNames, offset, limit) {
    loaderStore.show();
    let pokemonsUrlsList = [];
    const typeUrlsList = typeNames
      .map(name => appState.typesUrlsList.find(type => type.name === name).url);
    const typesPromisesList = typeUrlsList.map(url => ApiService.getByFullUrl(url));
    const typesList = await ApiService.getList(typesPromisesList);
    typesList.forEach((type) => {
      type.pokemon.forEach((pokemon) => {
        pokemonsUrlsList.push(pokemon.pokemon.url);
      });
    });
    this.filteredUrlsListLength = pokemonsUrlsList.length;
    pokemonsUrlsList = PokemonsFilteredList.filterByPage(pokemonsUrlsList, offset, limit);
    const pokemonsPromisesList = pokemonsUrlsList.map(url => ApiService.getByFullUrl(url));
    this.list = await ApiService.getList(pokemonsPromisesList);
    loaderStore.hide();
  }
}

const pokemonsFilteredList = new PokemonsFilteredList();
export default pokemonsFilteredList;
