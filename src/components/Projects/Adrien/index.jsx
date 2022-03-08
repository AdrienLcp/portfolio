import React, { useEffect } from 'react';

import './styles.scss';

import adrien from '../../../media/projects/adrien.png';
import link from '../../../media/icons/link.svg';
import github from '../../../media/social/github.svg';
import quit from '../../../media/icons/quit.svg';
import react from '../../../media/knowledges/react.svg';
import sass from '../../../media/knowledges/sass.svg';

const Adrien = ({ setShowPortfolio, setShowPresentation }) => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const close = () => {
    setShowPortfolio(false);
    setShowPresentation(true);
  };

  return (
    <div className='project'>

      <section className='project__header'>
        <div className='project__header__logo'>
          <img
            src={adrien}
            alt='Logo de mon portfolio'
            className='project__header__logo__img'
          />
        </div>

        <h3 className='project__header__title'>
          Mon Portfolio
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
              Vous êtes dessus. C'est mon site personnel, que j'avais fait à la va-vite au début pour m'entraîner, pendant ma formation. Je l'ai refait de zéro après la fin de cette formation pour l'améliorer et le mettre un petit peu au goût du jour.
            </p>
          </li>
        </ul>

        <ul className='project__infos__buttons'>

          <li className='project__infos__buttons__item'>
            <a 
              className='project__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://www.adrienlacourpaille.com/'
            >
              <div className='project__infos__buttons__item__link__icon'>
                <img
                  src={link}
                  alt='Lien vers mon portfolio'
                  className='project__infos__buttons__item__link__icon__img'
                />
              </div>
              <p className='project__infos__buttons__item__link__label'>
                Vous êtes déjà dessus
              </p>
            </a>
          </li>

          <li className='project__infos__buttons__item'>
            <a 
              className='project__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://github.com/AdrienLcp/portfolio'
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

export default Adrien;