import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

import stitch from '../../media/img/stitch.jpg';
import home from '../../media/nav/home.svg';

const NotFound = () => {

  useEffect(() => {
    document.title = "Page inconnue";

    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='not-found'>
      <div className='not-found__container'>
        <img
          src={stitch}
          alt='Stitch est perdu'
          className='not-found__container__img'
        />
      </div>
      <p className='not-found__title'>404</p>
      <p className='not-found__text'>La page que vous cherchez n'existe pas</p>
      <NavLink
        to='/'
        className='not-found__button'
      >
        <div className='not-found__button__icon'>
          <img
            src={home}
            alt="Retourner à l'accueil"
            className='not-found__button__icon__img'
          />
        </div>
        
        <p className='not-found__button__label'>
          Retourner à l'accueil
        </p>
      </NavLink>
    </section>
  );
};

export default NotFound;