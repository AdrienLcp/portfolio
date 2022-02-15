import React from 'react';

import './styles.scss';

import quit from '../../media/icons/quit.svg';

const Modal = (props) => {

  return (
    <section className='modal'>
      <div 
        className='behind'
        onClick={() => {
          props.closeModal();
        }}
      ></div>
      
      <div className='modal__container'>
        <button
          className='modal__container__quit'
          onClick={() => {
            props.closeModal();
          }}
        >
          <img
            className='modal__container__quit__icon'
            alt='Fermer cette fenêtre'
            src={quit}
          />
        </button>

        {props.children}

      </div>
    </section>
  );
};

export default Modal;