import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from '@material-ui/core/Card/Card';
import CardActionArea from '@material-ui/core/CardActionArea/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia/CardMedia';
import Typography from '@material-ui/core/Typography/Typography';
import CardActions from '@material-ui/core/CardActions/CardActions';
import CardContent from '@material-ui/core/CardContent/CardContent';
import withStyles from '@material-ui/core/styles/withStyles';
import './styles.css';


const styles = {
  media: {
    height: 140,
  },
};

// const idString = String(pokemon.id);
// const filler = '000';
// const pokemonId = filler.substring(0, filler.length - idString.length) + idString;
const PokemonCard = ({ pokemon, classes }) => (
  <Card className="pokemon-card_container">
    <Link to={`/pokemon/${pokemon.name}/`}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={pokemon.sprites.front_default}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {pokemon.name}
          </Typography>
          <Typography component="p">
                Lizards are a widespread group of
            squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Link>
    <CardActions />
  </Card>
  // <div className="column is-one-fourth">
  //   <div className="box">
  //     <div className="card-image">
  //       <figure className="image is-2by2 has-background-light">
  //         <Link to={`/pokemon/${pokemon.name}/`}>
  //           <img async src={pokemon.sprites.front_default} alt={pokemon.name} />
  //         </Link>
  //       </figure>
  //     </div>
  //     <div className="card-content">
  //       <div className="media">
  //         <div className="media-content">
  //           <p className="subtitle is-6 has-text-grey">
  //             {`#${pokemonId}`}
  //           </p>
  //           <p className="title is-4 is-capitalized">
  //             <Link to={`/pokemon/${pokemon.name}/`} className="has-text-black">
  //               {pokemon.name}
  //             </Link>
  //           </p>
  //           <p className="is-3">
  //             {`Height: ${pokemon.height / 10} m`}
  //           </p>
  //           <p className="is-3">
  //             {`Weight: ${pokemon.weight / 10} kg`}
  //           </p>
  //         </div>
  //       </div>
  //     </div>
  //     <footer className="card-footer">
  //       {pokemon.types.map(item => (
  //         <span
  //           key={item.type.name}
  //           className={`card-footer-item is-uppercase ${item.type.name}`}
  //         >
  //           {item.type.name}
  //         </span>
  //       ))}
  //     </footer>
  //   </div>
  // </div>
);
PokemonCard.propTypes = {
  pokemon: PropTypes.shape({}).isRequired,
  classes: PropTypes.shape({}).isRequired,
};
export default withStyles(styles)(PokemonCard);
