import React from 'react';

import './styles.scss';

import poupets from '../../../media/projects/poupets.svg';
import link from '../../../media/icons/link.svg';
import github from '../../../media/social/github.svg';
import html from '../../../media/knowledges/html.svg';
import css from '../../../media/knowledges/css.svg';

const Poupets = ( ) => {

  return (
    <div className='project'>

      <section className='project__header'>
        <div className='project__header__logo'>
          <img
            src={poupets}
            alt='Logo de mon portfolio'
            className='project__header__logo__img'
          />
        </div>

        <h3 className='project__header__title'>
          Les Poupets
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
                    alt='HTML'
                    src={html}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  HTML
                </p>
              </div>
              <div className='project__infos__list__item__techno__langages'>
                <div className='project__infos__list__item__techno__langages__img'>
                  <img
                    className='project__infos__list__item__techno__langages__img__icon'
                    alt='CSS'
                    src={css}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  CSS
                </p>
              </div>
            </div>
          </li>

          <li className='project__infos__list__item'>
            <h4 className='project__infos__list__item__title'>
              Rôle
            </h4>
            <p className='project__infos__list__item__text'>
              Lead Dev Front, Product Owner, Scrum Master, Git Master
            </p>
          </li>

          <li className='project__infos__list__item'>
            <h4 className='project__infos__list__item__title'>
              Description
            </h4>
            <p className='project__infos__list__item__text'>
              Un petit site, qui n'a demandé que quelques heures. Juste de quoi m'entraîner pendant la formation. J'ai ajouté une pointe de React après la fin de ma formation, pour trier entre les chats à voir, ainsi que quelques animations rapides.
            </p>
          </li>
        </ul>

        <ul className='project__infos__buttons'>

          <li className='project__infos__buttons__item'>
            <a 
              className='project__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://poupets.netlify.app/'
            >
              <div className='project__infos__buttons__item__link__icon'>
                <img
                  src={link}
                  alt='Lien vers mon portfolio'
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
              href='https://github.com/AdrienLcp/poupets'
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

export default Poupets;