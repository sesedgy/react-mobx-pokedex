import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import FormControl from '@material-ui/core/FormControl/FormControl';
import InputLabel from '@material-ui/core/InputLabel/InputLabel';
import Select from '@material-ui/core/Select/Select';
import TextField from '@material-ui/core/TextField/TextField';
import Grid from '@material-ui/core/Grid/Grid';
import ChipInput from 'material-ui-chip-input';
import PokemonCard from '../PokemonCard/index';
import './styles.css';

const filteringModes = {
  byPage: 1,
  byName: 2,
  byType: 3,
};

class PokemonList extends Component {
    state = {
      pageOffset: 0,
      pageNumber: 1,
      pagesCount: 1,
      pageSize: 5,
      filteringMode: filteringModes.byPage,
      // selectedPokemon: {},
      searchName: '',
      searchTypes: ['poison', 'grass'],
    };

    static getDerivedStateFromProps(props, state) {
      return {
        pagesCount: PokemonList.getPagesCount(props, state),
      };
    }

    static getPagesCount(props, state) {
      const { pageSize, filteringMode } = state;
      const { appState, pokemonsFilter } = props;
      let listLength = 0;
      if (filteringMode === 1) {
        listLength = appState.pokemonsUrlsList.length;
      } else {
        listLength = pokemonsFilter.filteredUrlsListLength;
      }
      return listLength !== 0 ? Math.ceil(listLength / pageSize) : 1;
    }


    componentDidMount() {
      const { pageOffset, pageSize } = this.state;
      const { pokemonsFilter } = this.props;
      this.setState({ filteringMode: filteringModes.byPage });
      pokemonsFilter.filterByPageOnServer(pageOffset, pageSize);
    }

    changePage(value) {
      const {
        pageSize, filteringMode, searchName, searchTypes,
      } = this.state;
      const { pokemonsFilter } = this.props;
      const newPageOffset = (value - 1) * pageSize;
      switch (filteringMode) {
        case 1:
          pokemonsFilter.filterByPageOnServer(newPageOffset, pageSize);
          break;
        case 2:
          pokemonsFilter.filterByName(searchName, newPageOffset, pageSize);
          break;
        case 3:
          pokemonsFilter.filterByType(searchTypes, newPageOffset, pageSize);
          break;
        default:
          break;
      }

      this.setState({ pageNumber: value, pageOffset: newPageOffset });
    }

    changePageSize(value) {
      const {
        filteringMode, searchName, searchTypes, pageNumber,
      } = this.state;
      const { pokemonsFilter } = this.props;
      const newPageOffset = (pageNumber - 1) * value;
      this.setState(prevState => (
        { pageSize: value, pagesCount: PokemonList.getPagesCount(this.props, prevState) }
      ));
      switch (filteringMode) {
        case 1:
          pokemonsFilter.filterByPageOnServer(newPageOffset, value);
          break;
        case 2:
          pokemonsFilter.filterByName(searchName, newPageOffset, value);
          break;
        case 3:
          pokemonsFilter.filterByType(searchTypes, newPageOffset, value);
          break;
        default:
          break;
      }
    }

    filterByName(value) {
      const { pageOffset, pageSize } = this.state;
      const { pokemonsFilter } = this.props;
      if (value === '') {
        pokemonsFilter.filterByPageOnServer(pageOffset, pageSize);
        return;
      }
      this.setState({ searchName: value, filteringMode: filteringModes.byName, pageNumber: 1 });
      pokemonsFilter.filterByName(value, 0, pageSize);
    }

    filterByType(value) {
      const { pageSize } = this.state;
      const { pokemonsFilter } = this.props;
      this.setState({ searchTypes: [value], filteringMode: filteringModes.byType, pageNumber: 1 });
      pokemonsFilter.filterByType([value], 0, pageSize);
    }

    render() {
      const {
        searchName, searchTypes, pageSize, pageNumber, pagesCount,
      } = this.state;
      const { pokemonsList } = this.props;
      return (
        <div>
          <div className="pokemons-list__controls-container">
            <Grid container>
              <Grid item xs={12} md={6}>
                <TextField
                  className="pokemons-list__control"
                  label="Filter by name"
                  value={searchName}
                  onChange={(e) => {
                    this.filterByName(e.target.value);
                  }}
                />
                <FormControl className="pokemons-list__control">
                  <ChipInput
                    value={searchTypes}
                    // dataSourceConfig={{ text: 'name', value: 'url' }}
                    onChange={(chips) => { this.filterByType(chips); }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <IconButton className="pokemons-list__page-button" onClick={() => { this.changePage(pageNumber - 1); }} disabled={pageNumber === 1}>
                  <ChevronLeftIcon />
                </IconButton>
                {`${pageNumber}/${pagesCount}`}
                <IconButton className="pokemons-list__page-button" onClick={() => { this.changePage(pageNumber + 1); }} disabled={pageNumber === pagesCount}>
                  <ChevronRightIcon />
                </IconButton>
                <FormControl className="pokemons-list__control">
                  <InputLabel>Count</InputLabel>
                  <Select
                    native
                    value={pageSize}
                    onChange={(e) => {
                      this.changePageSize(e.target.value);
                    }}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </div>
          <div className="pokemons-list__pokemons-container">
            {pokemonsList
                && pokemonsList.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}
          </div>
        </div>
      );
    }
}

PokemonList.propTypes = {
  appState: PropTypes.shape({}).isRequired,
  pokemonsFilter: PropTypes.shape({}).isRequired,
  pokemonsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default withRouter(PokemonList);
