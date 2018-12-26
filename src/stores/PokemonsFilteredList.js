import { observable, action } from 'mobx';
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
    let filteredPokemonUrls = [];
    const nameLowerCase = name.toLowerCase();
    appState.pokemonsUrlsList.forEach((item) => {
      if (item.name.toLowerCase().indexOf(nameLowerCase) === 0) {
        filteredPokemonUrls.push(item.url);
      }
    });
    this.filteredUrlsListLength = filteredPokemonUrls.length;
    filteredPokemonUrls = PokemonsFilteredList
      .filterByPage(filteredPokemonUrls, offset, limit);
    const promisesList = filteredPokemonUrls.map(url => ApiService.getByFullUrl(url));
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
