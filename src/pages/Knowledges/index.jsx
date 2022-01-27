import React, { useEffect } from 'react';

import './styles.scss';

import langages from '../../data/langages.json';
import others from '../../data/others.json';
import incoming from '../../data/incoming.json';
import skills from '../../data/skills.json';

import download from '../../media/icons/download.svg';
import CV from '../../media/files/CV_Adrien_Lacourpaille.pdf';

const Knowledges = () => {

  useEffect(() => {
    document.title = "Adrien Lacourpaille - Compétences";

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='knowledges'>
        <a
          href={CV}
          target='_blank'
          rel='noreferrer'
          className='knowledges__CV'
        >
          <img
            src={download}
            alt='Télécharger le CV'
            className='knowledges__CV__icon'
          />
          <p className='knowledges__CV__label'>
            Télécharger le CV
          </p>
        </a>
      <section className='knowledges__skills left'>
        <h4 className='knowledges__skills__title'>
          Compétences
        </h4>
        <p className='knowledges__skills__subtitle'>
          Une petite liste non exhaustive des langages front que je maitrise assez pour réussir les tests techniques ainsi que créer des sites webs designs, intéractifs. Je continue de me former et m'entraîner dessus en autodidacte.
        </p>
        <ul className='knowledges__skills__list'>

          {langages.map((langage, index) => {

            const itemAlt = 'Logo de ' + langage.name;

            return (
              <li
                key={index}
                className='knowledges__skills__list__item'
              >
                <img
                  className='knowledges__skills__list__item__icon'
                  alt={itemAlt}
                  src={langage.logo}
                />
                <p className='knowledges__skills__list__item__label'>
                  <strong>{langage.name}</strong>
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className='knowledges__skills right'>
        <h4 className='knowledges__skills__title'>
          Outils
        </h4>
        <p className='knowledges__skills__subtitle'>
          Vous pourrez aussi remarquer dans mon github que je maitrise les normes d'indentation et les conventions de nommages pour HTML, CSS, JavaScript et React.
        </p>
        <ul className='knowledges__skills__list'>

          {others.map((langage, index) => {

            const itemAlt = 'Logo de ' + langage.name;

            return (
              <li
                key={index}
                className='knowledges__skills__list__item'
              >
                <img
                  className='knowledges__skills__list__item__icon'
                  alt={itemAlt}
                  src={langage.logo}
                />
                <p className='knowledges__skills__list__item__label'>
                  <strong>{langage.name}</strong>
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className='knowledges__skills left'>
        <h4 className='knowledges__skills__title'>
          À venir
        </h4>
        <p className='knowledges__skills__subtitle'>
          Dans un futur proche, et si le temps me le permet, j'aimerais m'initier et m'améliorer sur les langages suivants.
        </p>
        <ul className='knowledges__skills__list'>

          {incoming.map((langage, index) => {

            const itemAlt = 'Logo de ' + langage.name;

            return (
              <li
                key={index}
                className='knowledges__skills__list__item'
              >
                <img
                  className='knowledges__skills__list__item__icon'
                  alt={itemAlt}
                  src={langage.logo}
                />
                <p className='knowledges__skills__list__item__label'>
                  <strong>{langage.name}</strong>
                </p>
              </li>
            );
          })}
        </ul>
      </section>

      <section className='knowledges__skills right'>
        <h4 className='knowledges__skills__title'>
          Les détails
        </h4>
        <p className='knowledges__skills__subtitle'>
          Quelques trucs à savoir sur moi
        </p>
        <ul className='knowledges__skills__list'>

          {skills.map((langage, index) => {

            const itemAlt = 'Logo de ' + langage.name;

            return (
              <li
                key={index}
                className='knowledges__skills__list__item'
              >
                <img
                  className='knowledges__skills__list__item__icon'
                  alt={itemAlt}
                  src={langage.logo}
                />
                <p className='knowledges__skills__list__item__label'>
                  <strong>{langage.name}</strong>
                </p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Knowledges;