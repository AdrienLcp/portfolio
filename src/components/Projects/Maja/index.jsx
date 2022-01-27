import React, { useRef, useEffect } from 'react';

import './styles.scss';

import maja from '../../../media/projects/maja.svg';
import link from '../../../media/icons/link.svg';
import github from '../../../media/social/github.svg';
import quit from '../../../media/icons/quit.svg';

const Maja = ({ setShowMaja, setShowPresentation }) => {

  const majaRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const close = () => {
    majaRef.current.style.opacity = '0';
    
    setTimeout(() => {
      setShowMaja(false);
      setShowPresentation(true);
    }, 300);
  };

  return (
    <div className='maja' ref={majaRef}>

      <section className='maja__header'>

        <img
          src={maja}
          alt='Logo de MAJA'
          className='maja__header__logo'
        />

        <h3 className='maja__header__title'>
          MAJA
        </h3>

        <button
          className='maja__header__quit'
          onClick={() => {
            close();
          }}
        >
          <img
            src={quit}
            className='maja__header__quit__icon'
            alt='Fermer ce projet'
          />
          <p className='maja__header__quit__label'>
            Fermer
          </p>
        </button>
      </section>
      
      <section className='maja__infos'>

        <ul className='maja__infos__list'>
          <li className='maja__infos__list__item'>
            <h4 className='maja__infos__list__item__title'>
              Technologies
            </h4>
            <p className='maja__infos__list__item__text'>
              React, PostgreSQL, JWT, API Deezer, SDK Deezer.
            </p>
          </li>

          <li className='maja__infos__list__item'>
            <h4 className='maja__infos__list__item__title'>
              Rôle
            </h4>
            <p className='maja__infos__list__item__text'>
              Lead Dev Front
            </p>
          </li>

          <li className='maja__infos__list__item'>
            <h4 className='maja__infos__list__item__title'>
              Description
            </h4>
            <p className='maja__infos__list__item__text'>
              Mon projet le plus abouti. Le seul où il y a un serveur et une base de données. C'est un site de blind test participatif. Après s'être créé un compte, les utilisateurs peuvent créer une playlist grâce à l'API Deezer. Celle-ci sera visible sur la page d'accueil et jouable par tous les visiteurs, inscrits ou non. Les joueurs entendent la musique sur le navigateur grâce au SDK de Deezer, et ont droit à 30 secondes pour essayer d'entrer le nom de l'artiste et le titre de la musique dans l'input. S'il a bon, il gagne des points. Les membres peuvent également noter les playlists, les notes étant visibles sur la page d'accueil, pour chaque playlist.
            </p>
          </li>
        </ul>

        <ul className='maja__infos__buttons'>

          <li className='maja__infos__buttons__item'>
            <a 
              className='maja__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://www.majagame.com/'
            >
              <img
                src={link}
                alt='Lien vers MAJA'
                className='maja__infos__buttons__item__link__icon'
              />
              <p className='maja__infos__buttons__item__link__label'>
                Visiter le site
              </p>
            </a>
          </li>

          <li className='maja__infos__buttons__item'>
            <a 
              className='maja__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://github.com/ProjectMAJA'
            >
              <img
                src={github}
                alt='Lien vers le Github de MAJA'
                className='maja__infos__buttons__item__link__icon'
              />
              <p className='maja__infos__buttons__item__link__label'>
                Voir le Github
              </p>
            </a>
          </li>

        </ul>
      </section>
    </div>
  );
};

export default Maja;