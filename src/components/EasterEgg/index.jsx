import React, { useRef } from 'react';

import './styles.scss';

import gift from '../../media/icons/gift.svg';
import quit from '../../media/icons/quit.svg';

const EasterEgg = ({ setShowEasterEgg }) => {

  const modalRef = useRef(null);

  const closeModal = () => {
    modalRef.current.style.opacity = '0';

    setTimeout(() => {
      setShowEasterEgg(false);
    }, 300);
  };

  return (
    <section className='easter-egg' ref={modalRef}>

      <div
        className='behind'
        onClick={() => {
          closeModal();
        }}
      ></div>

      <div class='pyro'>
        <div class='before'></div>
        <div class='after'></div>
      </div>

      <p className='easter-egg__container'>
        Félicitations, vous avez débloqué le secret du site !
        <button
          className='easter-egg__container__quit'
          onClick={() => {
            closeModal();
          }}
        >
          <img
            className='easter-egg__container__quit__icon'
            alt='Fermer cette fenêtre'
            src={quit}
          />
        </button>
        <a
          href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          className='easter-egg__container__button'
          rel='noreferrer'
          target='_blank'
          onClick={() => {
            closeModal();
          }}
        >
          <div className='easter-egg__container__button__icon'>
            <img
              src={gift}
              alt='Clique pour ouvrir ton cadeau'
              className='easter-egg__container__button__icon__img'
            />
          </div>
          <p className='easter-egg__container__button__label'>
            Ouvrir mon cadeau
          </p>
        </a>
      </p>
    </section>
  );
};

export default EasterEgg;