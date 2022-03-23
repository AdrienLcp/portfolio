import React from 'react';

import './styles.scss';

import list from '../../../media/projects/list.svg';
import link from '../../../media/icons/link.svg';
import github from '../../../media/social/github.svg';
import react from '../../../media/knowledges/react.svg';
import sass from '../../../media/knowledges/sass.svg';

const Todolist = () => {

  return (
    <div className='project'>

      <section className='project__header'>
        <div className='project__header__logo'>
          <img
            src={list}
            alt='Logo de mon portfolio'
            className='project__header__logo__img'
          />
        </div>

        <h3 className='project__header__title'>
          Procrastinalist
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
              Petit projet classique de todolist avec quelques fonctions intéressantes, utilisation du localStorage, et un dark mode.
            </p>
          </li>
        </ul>

        <ul className='project__infos__buttons'>

          <li className='project__infos__buttons__item'>
            <a 
              className='project__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://www.procrastinalist.com/'
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
              rel='noreferrer'
              target='_blank'
              href='https://github.com/AdrienLcp/procrastination-list'
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

export default Todolist;