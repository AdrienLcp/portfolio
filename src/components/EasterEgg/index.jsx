import React, { useRef } from 'react';

import Modal from '../Modal';

import './styles.scss';

import gift from '../../media/icons/gift.svg';

const EasterEgg = ({ setShowEasterEgg }) => {

  const modalRef = useRef(null);

  const closeModal = () => {
    modalRef.current.style.transition = '.3s';
    modalRef.current.style.opacity = '0';

    setTimeout(() => {
      setShowEasterEgg(false);
    }, 300);
  };

  return (
    <div ref={modalRef}>
      <Modal closeModal={closeModal}>
        <p className='easter-egg__title'>
          Félicitations, vous avez débloqué le secret du site !
        </p>

        <a
          href='https://www.youtube.com/watch?v=dQw4w9WgXcQ'
          className='easter-egg__button'
          rel='noreferrer'
          target='_blank'
          onClick={() => {
            closeModal();
          }}
        >
          <div className='easter-egg__button__icon'>
            <img
              src={gift}
              alt='Clique pour ouvrir ton cadeau'
              className='easter-egg__button__icon__img'
            />
          </div>
          <p className='easter-egg__button__label'>
            Ouvrir mon cadeau
          </p>
        </a>
      </Modal>
    </div>
  );
};

export default EasterEgg;