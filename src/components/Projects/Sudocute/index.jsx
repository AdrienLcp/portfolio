import React from 'react';

import './styles.scss';

import sudoku from '../../../media/projects/sudoku.png';
import link from '../../../media/icons/link.svg';
import github from '../../../media/social/github.svg';
import react from '../../../media/knowledges/react.svg';
import storage from '../../../media/knowledges/storage.svg';

const Sudocute = () => {

  return (
    <div className='project'>

      <section className='project__header'>
        <div className='project__header__logo'>
          <img
            src={sudoku}
            alt='Sudoku'
            className='project__header__logo__img'
          />
        </div>

        <h3 className='project__header__title'>
          SudoCute
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
                    alt='Local Storage'
                    src={storage}
                  />
                </div>
                <p className='project__infos__list__item__techno__langages__label'>
                  Local Storage
                </p>
              </div>
            </div>
          </li>

          <li className='project__infos__list__item'>
            <h4 className='project__infos__list__item__title'>
              Rôle
            </h4>
            <p className='project__infos__list__item__text'>
              Dev Front
            </p>
          </li>

          <li className='project__infos__list__item'>
            <h4 className='project__infos__list__item__title'>
              Description
            </h4>
            <p className='project__infos__list__item__text'>
              Ce projet a été réalisé avec un ami ayant suivi la même formation que moi. Il s'agit d'un site de Sudoku en ligne, avec choix de la difficulté, algorithme de génération aléatoire de grille (perfectionné par un tuto youtube, merci à Codamy), sauvegarde de celles-ci dans le local storage, choix de la langue (anglais ou français), ...
            </p>
          </li>
        </ul>

        <ul className='project__infos__buttons'>

          <li className='project__infos__buttons__item'>
            <a 
              className='project__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://www.sudocute.com/'
            >
              <div className='project__infos__buttons__item__link__icon'>
                <img
                  src={link}
                  alt='Lien vers SudoCute'
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
              href='https://github.com/Sudoku-project/sudoku'
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

export default Sudocute;