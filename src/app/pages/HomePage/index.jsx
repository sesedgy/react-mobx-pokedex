import React from 'react';
import { inject, observer } from 'mobx-react';
import PokemonList from '../../components/PokemonList';

const HomePage = inject('appState', 'pokemonsFilteredList')(observer(({ appState, pokemonsFilteredList }) => (
  <PokemonList
    appState={appState}
    pokemonsFilter={pokemonsFilteredList}
    pokemonsList={pokemonsFilteredList.list}
  />
)));

export default HomePage;
