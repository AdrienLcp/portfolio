import React from 'react';

import './styles.scss';

import madam from '../../../media/projects/madam.png';
import link from '../../../media/icons/link.svg';
import github from '../../../media/social/github.svg';
import javascript from '../../../media/knowledges/javascript.svg';
import scss from '../../../media/knowledges/sass.svg';

const Madam = ( ) => {

  return (
    <div className='project'>

      <section className='project__header'>
        <div className='project__header__logo'>
          <img
            src={madam}
            alt='Logo de mon portfolio'
            className='project__header__logo__img'
          />
        </div>

        <h3 className='project__header__title'>
          MaDaM
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
                    alt='JavaScript'
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
                    alt='SCSS'
                    src={scss}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  SCSS
                </p>
              </div>
            </div>
          </li>

          <li className='project__infos__list__item'>
            <h4 className='project__infos__list__item__title'>
              Rôle
            </h4>
            <p className='project__infos__list__item__text'>
              Tout le développement
            </p>
          </li>

          <li className='project__infos__list__item'>
            <h4 className='project__infos__list__item__title'>
              Description
            </h4>
            <p className='project__infos__list__item__text'>
              Un petit site vitrine, commandé par mes deux premiers clients. Étant mon premier projet solo, il est loin d'être parfait, mais il reste intéressant pour les animations, le travail des couleurs et surtout pour le slider fait maison que j'ai créé (ni doc ni tuto).
            </p>
          </li>
        </ul>

        <ul className='project__infos__buttons'>

          <li className='project__infos__buttons__item'>
            <a 
              className='project__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://madam-project.netlify.app/'
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
              href='https://github.com/AdrienLcp/madam'
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

export default Madam;