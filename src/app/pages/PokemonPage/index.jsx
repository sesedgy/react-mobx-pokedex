import React from 'react';
import { inject, observer } from 'mobx-react';
import PokemonList from '../../components/PokemonList';

const PokemonPage = inject('appState', 'pokemonsFilteredList')(observer(({ appState, pokemonsFilteredList }) => (
  <PokemonList appState={appState} pokemonsFilteredList={pokemonsFilteredList} />
)));

export default PokemonPage;
