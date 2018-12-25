import React from 'react';
import './styles.css';
import { inject, observer } from 'mobx-react';
import PokeballImg from '../../../assets/Pokeball.png';

const Loader = inject('loaderStore')(observer(({ loaderStore }) => (
  loaderStore.isVisible
    ? (
      <div className="loader-overlay">
        <div className="loader"><img alt="pokeball" src={PokeballImg} /></div>
      </div>
    ) : null
)));

export default Loader;
