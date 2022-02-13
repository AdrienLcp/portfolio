import React, { useRef, useEffect } from 'react';

import './styles.scss';

import poupets from '../../../media/projects/poupets.svg';
import link from '../../../media/icons/link.svg';
import github from '../../../media/social/github.svg';
import quit from '../../../media/icons/quit.svg';

const Poupets = ({ setShowPoupets, setShowPresentation }) => {

  const poupetsRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const close = () => {
    poupetsRef.current.style.opacity = '0';
    
    setTimeout(() => {
      setShowPoupets(false);
      setShowPresentation(true);
    }, 300);
  };

  return (
    <div className='poupets' ref={poupetsRef}>

      <section className='poupets__header'>
        <div className='poupets__header__logo'>
          <img
            src={poupets}
            alt='Logo de mon portfolio'
            className='poupets__header__logo__img'
          />
        </div>

        <h3 className='poupets__header__title'>
          Les Poupets
        </h3>

        <button
          className='poupets__header__quit'
          onClick={() => {
            close();
          }}
        >
          <img
            src={quit}
            className='poupets__header__quit__icon'
            alt='Fermer ce projet'
          />
          <p className='poupets__header__quit__label'>
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
            <p className='poupets__infos__list__item__text'>
              HTML, SCSS, un peu de JS et de React.
            </p>
          </li>

          <li className='poupets__infos__list__item'>
            <h4 className='poupets__infos__list__item__title'>
              Rôle
            </h4>
            <p className='poupets__infos__list__item__text'>
              Lead Dev Front, Product Owner, Scrum Master, Git Master
            </p>
          </li>

          <li className='poupets__infos__list__item'>
            <h4 className='poupets__infos__list__item__title'>
              Description
            </h4>
            <p className='poupets__infos__list__item__text'>
              Un petit site, qui n'a demandé que quelques heures. Juste de quoi m'entraîner pendant la formation. J'ai ajouté une pointe de React après la fin de ma formation, pour trier entre les chats à voir, ainsi que quelques animations rapides.
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
              <div className='poupets__infos__buttons__item__link__icon'>
                <img
                  src={link}
                  alt='Lien vers mon portfolio'
                  className='poupets__infos__buttons__item__link__icon__img'
                />
              </div>
              <p className='poupets__infos__buttons__item__link__label'>
                Visiter le site
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
              <div className='poupets__infos__buttons__item__link__icon'>
                <img
                  src={github}
                  alt='Lien vers le Github de mon portfolio'
                  className='poupets__infos__buttons__item__link__icon__img'
                />
              </div>

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