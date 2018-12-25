export const APP_NAME = 'Pokedex'; // Название приложения

export const API_CONFIG = {
  protocol: 'https',
  hostName: 'pokeapi-215911.firebaseapp.com',
  versionPath: '/api/v2/',
};

export const API_PATHS = {
  GET: {
    POKEMONS_FULL_LIST: 'pokemon?offset=0&limit=949',
    POKEMONS_LIST: 'pokemon',
    TYPES_LIST: 'type',
  },
  POST: {},
};
