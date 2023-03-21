import React from 'react';

import './styles.scss';

import kanisson from '../../../media/projects/kanisson.png';
import link from '../../../media/icons/link.svg';
import github from '../../../media/social/github.svg';
import react from '../../../media/knowledges/react.svg';
import sass from '../../../media/knowledges/sass.svg';
import next from '../../../media/knowledges/next.svg';
import prisma from '../../../media/knowledges/prisma.svg';
import typescript from '../../../media/knowledges/typescript.svg';
import youtube from '../../../media/knowledges/youtube.svg';
import jwt from '../../../media/knowledges/jwt.svg';
import javascript from '../../../media/knowledges/javascript.svg';

const Kanisson = () => {

  return (
    <div className='project'>
      <section className='project__header'>
        <div className='project__header__logo'>
          <img
            src={kanisson}
            alt='Un vynil'
            className='project__header__logo__img'
          />
        </div>

        <h3 className='project__header__title'>
          Kanisson
        </h3>
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
                    alt='Next'
                    src={next}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  Next.js
                </p>
              </div>

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
                    alt='Javascript'
                    src={javascript}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  Javascript
                </p>
              </div>

              <div className='project__infos__list__item__techno__langages'>
                <div className='project__infos__list__item__techno__langages__img'>
                  <img
                    className='project__infos__list__item__techno__langages__img__icon'
                    alt='Typescript'
                    src={typescript}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  Typescript
                </p>
              </div>

              <div className='project__infos__list__item__techno__langages'>
                <div className='project__infos__list__item__techno__langages__img'>
                  <img
                    className='project__infos__list__item__techno__langages__img__icon'
                    alt='Prisma'
                    src={prisma}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  Prisma
                </p>
              </div>

              <div className='project__infos__list__item__techno__langages'>
                <div className='project__infos__list__item__techno__langages__img'>
                  <img
                    className='project__infos__list__item__techno__langages__img__icon'
                    alt='API Youtube'
                    src={youtube}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  API Youtube
                </p>
              </div>

              <div className='project__infos__list__item__techno__langages'>
                <div className='project__infos__list__item__techno__langages__img'>
                  <img
                    className='project__infos__list__item__techno__langages__img__icon'
                    alt='Json Web Token'
                    src={jwt}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  JsonWebToken & Bcrypt
                </p>
              </div>

              <div className='project__infos__list__item__techno__langages'>
                <div className='project__infos__list__item__techno__langages__img'>
                  <img
                    className='project__infos__list__item__techno__langages__img__icon'
                    alt='Sass'
                    src={sass}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  Sass
                </p>
              </div>
            </div>
          </li>

          <li className='project__infos__list__item'>
            <h4 className='project__infos__list__item__title'>
              Rôle
            </h4>
            <p className='project__infos__list__item__text'>
              Lead Dev Front, Product Owner, Scrum Master, Git Master, Grand seigneur suprême
            </p>
          </li>

          <li className='project__infos__list__item'>
            <h4 className='project__infos__list__item__title'>
              Description
            </h4>
            <p className='project__infos__list__item__text'>
              Mon plus gros projet, il a été bâti sur mon temps libre à côté de mon travail. Il s'agit d'un site de blind test participatif. Les visiteurs peuvent jouer aux blind tests créés par la communauté, et les utilisateurs inscrits peuvent créer de nouveaux blind tests grâce à l'API de Youtube.
            </p>
          </li>
        </ul>

        <ul className='project__infos__buttons'>

          <li className='project__infos__buttons__item'>
            <a 
              className='project__infos__buttons__item__link'
              target='_blank'
              href='https://www.kanisson.com/'
            >
              <div className='project__infos__buttons__item__link__icon'>
                <img
                  src={link}
                  alt='Lien vers ma todolist'
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
              target='_blank'
              href='https://github.com/AdrienLcp/kanisson'
            >
              <div className='project__infos__buttons__item__link__icon'>
                <img
                  src={github}
                  alt='Lien vers le Github de mon portfolio'
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

export default Kanisson;