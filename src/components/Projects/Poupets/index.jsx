import React, { useRef } from 'react';

import './styles.scss';

import poupets from '../../../media/projects/poupets.svg';
import link from '../../../media/icons/link.svg';
import github from '../../../media/social/github.svg';
import quit from '../../../media/icons/quit.svg';

const Poupets = ({ setShowPortfolio, setShowPresentation }) => {

  const poupetsRef = useRef(null);

  const close = () => {
    poupetsRef.current.style.opacity = '0';
    
    setTimeout(() => {
      setShowPortfolio(false);
      setShowPresentation(true);
    }, 300);
  };

  return (
    <div className='poupets' ref={poupetsRef}>

      <section className='poupets__header'>

        <img
          src={poupets}
          alt='Logo de mon portfolio'
          className='poupets__header__logo'
        />

        <h3 className='poupets__header__title'>
          Mon Portfolio
        </h3>

        <button
          className='poupets__quit'
          onClick={() => {
            close();
          }}
        >
          <img
            src={quit}
            className='poupets__quit__icon'
            alt='Fermer ce projet'
          />
          <p className='poupets__quit__label'>
            Fermer
          </p>
        </button>
      </section>
      
      <section className='poupets__infos'>

        <ul className='poupets__infos__list'>
          <li className='poupets__infos__list__item'>
            <h4 className='poupets__infos__list__item__title'>
              Technologies
            </h4>
            <p className='poupets__infos__list__item__role'>
              React, SASS.
            </p>
          </li>

          <li className='poupets__infos__list__item'>
            <h4 className='poupets__infos__list__item__title'>
              Rôle
            </h4>
            <p className='poupets__infos__list__item__role'>
              Lead Dev Front, Product Owner, Scrum Master, Git Master, Grand seigneur suprême
            </p>
          </li>

          <li className='poupets__infos__list__item'>
            <h4 className='poupets__infos__list__item__title'>
              Description
            </h4>
            <p className='poupets__infos__list__item__role'>
              Vous êtes dessus. C'est mon site personnel, que j'avais fait à la va-vite au début pour m'entraîner, pendant ma formation. Je l'ai refait de zéro après la fin de cette formation pour l'améliorer et le mettre un petit peu au goût du jour.
            </p>
          </li>
        </ul>

        <ul className='poupets__infos__buttons'>

          <li className='poupets__infos__buttons__item'>
            <a 
              className='poupets__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://poupets.netlify.app/'
            >
              <img
                src={link}
                alt='Lien vers mon portfolio'
                className='poupets__infos__buttons__item__link__icon'
              />
              <p className='poupets__infos__buttons__item__link__label'>
                Lien vers le site
              </p>
            </a>
          </li>

          <li className='poupets__infos__buttons__item'>
            <a 
              className='poupets__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://github.com/AdrienLcp/poupets'
            >
              <img
                src={github}
                alt='Lien vers le Github de mon portfolio'
                className='poupets__infos__buttons__item__link__icon'
              />
              <p className='poupets__infos__buttons__item__link__label'>
                Voir le Github
              </p>
            </a>
          </li>

        </ul>
      </section>
    </div>
  );
};

export default Poupets;