import React, { useRef, useEffect } from 'react';

import './styles.scss';

import adrien from '../../../media/projects/adrien.png';
import link from '../../../media/icons/link.svg';
import github from '../../../media/social/github.svg';
import quit from '../../../media/icons/quit.svg';

const Adrien = ({ setShowPortfolio, setShowPresentation }) => {

  const adrienRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const close = () => {
    adrienRef.current.style.opacity = '0';
    
    setTimeout(() => {
      setShowPortfolio(false);
      setShowPresentation(true);
    }, 300);
  };

  return (
    <div className='adrien' ref={adrienRef}>

      <section className='adrien__header'>

        <img
          src={adrien}
          alt='Logo de mon portfolio'
          className='adrien__header__logo'
        />

        <h3 className='adrien__header__title'>
          Mon Portfolio
        </h3>

        <button
          className='adrien__header__quit'
          onClick={() => {
            close();
          }}
        >
          <img
            src={quit}
            className='adrien__header__quit__icon'
            alt='Fermer ce projet'
          />
          <p className='adrien__header__quit__label'>
            Fermer
          </p>
        </button>
      </section>
      
      <section className='adrien__infos'>

        <ul className='adrien__infos__list'>
          <li className='adrien__infos__list__item'>
            <h4 className='adrien__infos__list__item__title'>
              Technologies
            </h4>
            <p className='adrien__infos__list__item__text'>
              React, SASS.
            </p>
          </li>

          <li className='adrien__infos__list__item'>
            <h4 className='adrien__infos__list__item__title'>
              Rôle
            </h4>
            <p className='adrien__infos__list__item__text'>
              Lead Dev Front, Product Owner, Scrum Master, Git Master, Grand seigneur suprême
            </p>
          </li>

          <li className='adrien__infos__list__item'>
            <h4 className='adrien__infos__list__item__title'>
              Description
            </h4>
            <p className='adrien__infos__list__item__text'>
              Vous êtes dessus. C'est mon site personnel, que j'avais fait à la va-vite au début pour m'entraîner, pendant ma formation. Je l'ai refait de zéro après la fin de cette formation pour l'améliorer et le mettre un petit peu au goût du jour.
            </p>
          </li>
        </ul>

        <ul className='adrien__infos__buttons'>

          <li className='adrien__infos__buttons__item'>
            <a 
              className='adrien__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://www.adrienlacourpaille.com/'
            >
              <img
                src={link}
                alt='Lien vers mon portfolio'
                className='adrien__infos__buttons__item__link__icon'
              />
              <p className='adrien__infos__buttons__item__link__label'>
                Visiter le site
              </p>
            </a>
          </li>

          <li className='adrien__infos__buttons__item'>
            <a 
              className='adrien__infos__buttons__item__link'
              rel='noreferrer'
              target='_blank'
              href='https://github.com/AdrienLcp/portfolio'
            >
              <img
                src={github}
                alt='Lien vers le Github de mon portfolio'
                className='adrien__infos__buttons__item__link__icon'
              />
              <p className='adrien__infos__buttons__item__link__label'>
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