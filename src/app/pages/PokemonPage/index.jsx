import React from 'react';
import { inject, observer } from 'mobx-react';
import PokemonProfile from '../../components/PokemonProfile';

const PokemonPage = inject('pokemonProfileStore')(observer(({ pokemonProfileStore }) => (
  <PokemonProfile pokemonProfileStore={pokemonProfileStore} pokemon={pokemonProfileStore.pokemon} />
)));

export default PokemonPage;
