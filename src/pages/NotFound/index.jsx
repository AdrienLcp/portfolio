import React, { useEffect } from 'react';

import './styles.scss';

import stitch from '../../media/img/stitch.jpg';
import home from '../../media/nav/home.svg';

const NotFound = () => {

  useEffect(() => {
    document.title = "Page inconnue";
  }, []);

  return (
    <div className='not-found'>
      <img
        src={stitch}
        alt='Stitch est perdu'
        className='not-found__img'
      />
      <p className='not-found__title'>404</p>
      <p className='not-found__text'>La page que vous cherchez n'existe pas</p>
      <button className='not-found__button'>
        <img
          src={home}
          alt="Retourner à l'accueil"
          className='not-found__button__icon'
        />
        <p className='not-found__button__label'>
          Retourner à l'accueil
        </p>
      </button>
    </div>
  );
};

export default NotFound;