import HomePage from './pages/HomePage/index';
import PokemonPage from './pages/PokemonPage/index';

const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/pokemon/:name',
    exact: true,
    component: PokemonPage,
  },
];

export default routes;
