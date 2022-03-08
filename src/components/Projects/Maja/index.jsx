import React, { useEffect } from 'react';

import './styles.scss';

import maja from '../../../media/projects/maja.svg';
import link from '../../../media/icons/link.svg';
import github from '../../../media/social/github.svg';
import quit from '../../../media/icons/quit.svg';
import react from '../../../media/knowledges/react.svg';
import pgsql from '../../../media/knowledges/pgsql.svg';
import sdk from '../../../media/knowledges/sound.svg';
import deezer from '../../../media/knowledges/deezer.svg';
import jwt from '../../../media/knowledges/jwt.svg';

const Maja = ({ setShowMaja, setShowPresentation }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const close = () => {
    setShowMaja(false);
    setShowPresentation(true);
  };

  return (
    <div className='project'>

      <section className='project__header'>
        <div className='project__header__logo'>
          <img
            src={maja}
            alt='Logo de mon portfolio'
            className='project__header__logo__img'
          />
        </div>

        <h3 className='project__header__title'>
          MAJA
        </h3>

        <button
          className='project__header__quit'
          onClick={() => {
            close();
          }}
        >
          <img
            src={quit}
            className='project__header__quit__icon'
            alt='Fermer ce projet'
          />
          <p className='project__header__quit__label'>
            Fermer
          </p>
        </button>
      </section>
      
      <section className='project__infos'>

        <ul className='project__infos__list'>
          <li className='project__infos__list__item'>
            <h4 className='project__infos__list__item__title'>
              Technologies
            </h4>
            <div className='project__infos__list__item__techno'>
              <div className='project__infos__list__item__techno__langages'>
                <div className='project__infos__list__item__techno__langages__img'>
                  <img
                    className='project__infos__list__item__techno__langages__img__icon'
                    alt='React'
                    src={react}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  React
                </p>
              </div>
              <div className='project__infos__list__item__techno__langages'>
                <div className='project__infos__list__item__techno__langages__img'>
                  <img
                    className='project__infos__list__item__techno__langages__img__icon'
                    alt='PostgreSQL'
                    src={pgsql}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  PostgreSQL
                </p>
              </div>
              <div className='project__infos__list__item__techno__langages'>
                <div className='project__infos__list__item__techno__langages__img'>
                  <img
                    className='project__infos__list__item__techno__langages__img__icon'
                    alt='JsonWebTokens'
                    src={jwt}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  JsonWebTokens
                </p>
              </div>
              <div className='project__infos__list__item__techno__langages'>
                <div className='project__infos__list__item__techno__langages__img'>
                  <img
                    className='project__infos__list__item__techno__langages__img__icon'
                    alt='API Deezer'
                    src={deezer}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  API Deezer
                </p>
              </div>
              <div className='project__infos__list__item__techno__langages'>
                <div className='project__infos__list__item__techno__langages__img'>
                  <img
                    className='project__infos__list__item__techno__langages__img__icon'
                    alt='SDK Deezer'
                    src={sdk}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  SDK Deezer
                </p>
              </div>
            </div>
          </li>

          <li className='project__infos__list__item'>
            <h4 className='project__infos__list__item__title'>
              Rôle
            </h4>
            <p className='project__infos__list__item__text'>
              Lead Dev Front
            </p>
          </li>

          <li className='project__infos__list__item'>
            <h4 className='project__infos__list__item__title'>
              Description
            </h4>
            <p className='project__infos__list__item__text'>
              Mon projet le plus abouti. Le seul où il y a un serveur et une base de données. C'est un site de blind test participatif. Après s'être créé un compte, les utilisateurs peuvent créer une playlist grâce à l'API Deezer. Celle-ci sera visible sur la page d'accueil et jouable par tous les visiteurs, inscrits ou non. Les joueurs entendent la musique sur le navigateur grâce au SDK de Deezer, et ont droit à 30 secondes pour essayer d'entrer le nom de l'artiste et le titre de la musique dans l'input. S'il a bon, il gagne des points. Les membres peuvent également noter les playlists, les notes étant visibles sur la page d'accueil, pour chaque playlist.
            </p>
          </li>
        </ul>

        <ul className='project__infos__buttons'>

          <li className='project__infos__buttons__item'>
            <a 
              className='project__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://www.majagame.com/'
            >
              <div className='project__infos__buttons__item__link__icon'>
                <img
                  src={link}
                  alt='Lien vers MAJA'
                  className='project__infos__buttons__item__link__icon__img'
                />
              </div>
              <p className='project__infos__buttons__item__link__label'>
                Visiter le site
              </p>
            </a>
          </li>

          <li className='project__infos__buttons__item'>
            <a 
              className='project__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://github.com/ProjectMAJA'
            >
              <div className='project__infos__buttons__item__link__icon'>
                <img
                  src={github}
                  alt='Lien vers le Github de MAJA'
                  className='project__infos__buttons__item__link__icon__img'
                />
              </div>
              <p className='project__infos__buttons__item__link__label'>
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