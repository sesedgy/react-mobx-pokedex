import { observable, action, flow } from 'mobx';
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
  filterByPageOnServer = flow(function* filterByPage(offset = 1, limit = appState.pokemonsCount) {
    loaderStore.show();
    const promisesList = [];
    const newOffset = Number(offset);
    const newLimit = Number(limit) + newOffset;
    for (let i = newOffset; i < newLimit; i += 1) {
      promisesList.push(ApiService.getPromiseByFullUrl(appState.pokemonsUrlsList[i].url));
    }
    this.list = yield ApiService.getResultsList(promisesList);
    loaderStore.hide();
  });

  @action
  filterByName = flow(function* filterByName(name, offset, limit) {
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
    const promisesList = filteredPokemonUrls.map(url => ApiService.getPromiseByFullUrl(url));
    this.list = yield ApiService.getResultsList(promisesList);
    loaderStore.hide();
  });

  @action
  filterByType = flow(function* filterByType(typeNames, offset, limit) {
    loaderStore.show();
    let pokemonsUrlsList = [];
    const typeUrlsList = typeNames
      .map(name => appState.typesUrlsList.find(type => type.name === name).url);
    const typesPromisesList = typeUrlsList.map(url => ApiService.getPromiseByFullUrl(url));
    const typesList = yield ApiService.getResultsList(typesPromisesList);
    typesList.forEach((type) => {
      type.pokemon.forEach((pokemon) => {
        pokemonsUrlsList.push(pokemon.pokemon.url);
      });
    });
    this.filteredUrlsListLength = pokemonsUrlsList.length;
    pokemonsUrlsList = PokemonsFilteredList.filterByPage(pokemonsUrlsList, offset, limit);
    const pokemonsPromisesList = pokemonsUrlsList.map(url => ApiService.getPromiseByFullUrl(url));
    this.list = yield ApiService.getResultsList(pokemonsPromisesList);
    loaderStore.hide();
  });
}

const pokemonsFilteredList = new PokemonsFilteredList();
export default pokemonsFilteredList;
