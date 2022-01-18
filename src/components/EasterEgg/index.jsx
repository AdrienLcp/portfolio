import React from 'react';

import './styles.scss';

const EasterEgg = ({ setShowEasterEgg }) => {

  return (
    <section className='easter-egg'>

      <div class="pyro">
        <div class="before"></div>
        <div class="after"></div>
      </div>

      <p className='easter-egg__container'>
        Félicitations, vous avez débloqué le secret du site !
        <a
          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          className="easter-egg__container__button"
          rel="noreferrer"
          target="_blank"
          onClick={() => {
            setShowEasterEgg(false);
          }}
        >
          Cliquez ici
        </a>
      </p>
    </section>
  );
};

export default EasterEgg;