import React from 'react';

import './styles.scss';

import gift from '../../media/icons/gift.svg';

const EasterEgg = ({ setShowEasterEgg }) => {

  return (
    <section className='easter-egg'>

      <div class='pyro'>
        <div class='before'></div>
        <div class='after'></div>
      </div>

      <p className='easter-egg__container'>
        Félicitations, vous avez débloqué le secret du site !
        <a
          href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          className='easter-egg__container__button'
          rel='noreferrer'
          target='_blank'
          onClick={() => {
            setShowEasterEgg(false);
          }}
        >
          <img
            src={gift}
            alt='Clique pour ouvrir ton cadeau'
            className='easter-egg__container__button__icon'
          />
          <p className='easter-egg__container__button__label'>
            Ouvrir mon cadeau
          </p>
        </a>
      </p>
    </section>
  );
};

export default EasterEgg;