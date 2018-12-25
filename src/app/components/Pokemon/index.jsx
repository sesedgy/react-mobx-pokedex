import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import SpritesCard from '../SpritesCard';
import StatsCard from '../StatsCard';
import DetailCard from '../DetailCard';
import SpecieCard from '../SpecieCard';

class Pokemon extends Component {
  componentDidMount() {

  }

  render() {
    const { pokemonObject, specieObject } = this.props;
    const flavor = Object.values(specieObject.specie.flavor_text_entries).pop();
    const genera = specieObject.specie.genera[2];
    return (
      <div className="container">
        {(!pokemonObject.loading) ? (
          <section className="section">
            <div className="columns">
              <div className="column is-one-fourth">
                <SpecieCard
                  number={pokemonObject.pokemon.id}
                  name={pokemonObject.pokemon.name}
                  image={pokemonObject.pokemon.sprites.front_default}
                  types={pokemonObject.pokemon.types}
                  flavor_text={flavor.flavor_text}
                />
              </div>
              <div className="column is-two-thirds">
                <DetailCard
                  height={pokemonObject.pokemon.height}
                  weight={pokemonObject.pokemon.weight}
                  category={(genera) ? genera.genus : '-'}
                  ablities={Object.values(pokemonObject.pokemon.abilities)}
                />
                <StatsCard stats={Object.values(pokemonObject.pokemon.stats)} />
              </div>
            </div>
            <SpritesCard
              sprites={Object.values(pokemonObject.pokemon.sprites)}
              name={pokemonObject.pokemon.name}
            />
          </section>
        )
          : (<section className="section"><span className="loader" style={{ margin: '0 auto' }} /></section>)}
      </div>
    );
  }
}

Pokemon.propTypes = {
  pokemonObject: PropTypes.shape({}).isRequired,
  specieObject: PropTypes.shape({}).isRequired,
};

export default withRouter(Pokemon);
