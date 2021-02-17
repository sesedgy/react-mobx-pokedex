import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import withRouter from 'react-router-dom/withRouter';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import Typography from '@material-ui/core/Typography/Typography';
import Chip from '@material-ui/core/Chip/Chip';
import Paper from '@material-ui/core/Paper/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import './styles.css';

class PokemonProfile extends PureComponent {
  componentDidMount() {
    const { match, pokemonProfileStore } = this.props;
    pokemonProfileStore.getPokemon(match.params.name);
  }

  render() {
    const { pokemon } = this.props;
    if (!pokemon) {
      return null;
    }
    const idString = String(pokemon.id);
    const filler = '000';
    const pokemonNumber = filler.substring(0, filler.length - idString.length) + idString;
    const pokemonSprites = [];
    Object.keys(pokemon.sprites).forEach((key) => {
      if (pokemon.sprites[key] && typeof pokemon.sprites[key] === 'string') {
        pokemonSprites.push(pokemon.sprites[key]);
      }
    });

    return (
      <div className="pokemon-profile__container">
        <div className="pokemon-profile__left-column-container">
          <Paper className="pokemon-profile__paper-container">
            <CardMedia
              className="pokemon-profile__media"
              image={pokemon.sprites.front_default}
              title={pokemon.name}
            />
            <Typography>
              {`#${pokemonNumber}`}
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
              {pokemon.name}
            </Typography>
            <div className="pokemon-card__chips-container">
              {pokemon.types.map(type => <Chip key={type.type.name} label={type.type.name} className={`pokemon-card__chip ${type.type.name}`} />)}
            </div>
          </Paper>

          <Paper className="pokemon-profile__paper-container">
            <Typography variant="h5" component="h2" className="pokemon-profile__paper-heading">
            Details
            </Typography>
            <div className="pokemon-profile__detail-container">
              <Typography className="pokemon-profile__detail-title">
                Height:
              </Typography>
              <Typography className="pokemon-profile__detail-text lowercase-text">
                {`${pokemon.height / 10} m`}
              </Typography>
            </div>
            <div className="pokemon-profile__detail-container">
              <Typography className="pokemon-profile__detail-title">
              Weight:
              </Typography>
              <Typography className="pokemon-profile__detail-text lowercase-text">
                {`${pokemon.weight / 10} kg`}
              </Typography>
            </div>
            <div className="pokemon-profile__detail-container" style={{ height: `${pokemon.abilities.length * 20}px`, minHeight: '10px' }}>
              <Typography className="pokemon-profile__detail-title">
              Abilities:
              </Typography>
              {pokemon.abilities.map(ability => (
                <Typography className="pokemon-profile__detail-text" key={ability.ability.name}>
                  {ability.ability.name}
                </Typography>
              ))}
            </div>
          </Paper>
        </div>
        <div className="pokemon-profile__right-column-container">
          <Paper className="pokemon-profile__paper-container">
            <Typography variant="h5" component="h2" className="pokemon-profile__paper-heading">
            Stats
            </Typography>
            {pokemon.stats.map(stat => (
              <div className="pokemon-profile__stat-container" key={stat.stat.name}>
                <Typography>
                  {stat.stat.name}
                </Typography>
                <LinearProgress variant="determinate" value={stat.base_stat} />
              </div>
            ))}

          </Paper>

          <Paper className="pokemon-profile__paper-container">
            <Typography variant="h5" component="h2" className="pokemon-profile__paper-heading">
            Sprites
            </Typography>
            <div>
              {pokemonSprites.map(sprite => (
                <img
                  className="pokemon-profile__sprite"
                  key={sprite}
                  alt={pokemon.name}
                  src={sprite}
                />
              ))}
            </div>
          </Paper>
        </div>
      </div>
    );
  }
}

PokemonProfile.propTypes = {
  pokemon: PropTypes.shape({}),
  match: PropTypes.shape({}).isRequired,
  pokemonProfileStore: PropTypes.shape({}).isRequired,
};

PokemonProfile.defaultProps = {
  pokemon: null,
};

export default withRouter(PokemonProfile);
