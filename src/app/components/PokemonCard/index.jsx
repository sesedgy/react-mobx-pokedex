import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card/Card';
import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import Typography from '@material-ui/core/Typography/Typography';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Chip from '@material-ui/core/Chip/Chip';
import './styles.css';


const PokemonCard = ({ pokemon }) => {
  const idString = String(pokemon.id);
  const filler = '000';
  const pokemonNumber = filler.substring(0, filler.length - idString.length) + idString;
  return (
    <Card className="pokemon-card__container">
      <CardActionArea>
        <CardMedia
          className="pokemon-card__media"
          image={pokemon.sprites.front_default}
          title={pokemon.name}
        />
        <CardContent>
          <Typography>
            {`#${pokemonNumber}`}
          </Typography>
          <Typography gutterBottom variant="h5" component="h2">
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.substr(1)}
          </Typography>
          <Typography>
            {`Height: ${pokemon.height / 10} m`}
          </Typography>
          <Typography>
            {`Weight: ${pokemon.weight / 10} kg`}
          </Typography>
          <div className="pokemon-card__chips-container">
            {pokemon.types.map(type => <Chip key={type.type.name} label={type.type.name} className={`pokemon-card__chip ${type.type.name}`} />)}
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
PokemonCard.propTypes = {
  pokemon: PropTypes.shape({}).isRequired,
};
export default PokemonCard;
