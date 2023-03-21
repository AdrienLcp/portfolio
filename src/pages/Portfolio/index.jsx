import React, { useEffect } from 'react';

import Projects from '../../components/Projects';
import Sudocute from '../../components/Projects/Sudocute';
import Madam from '../../components/Projects/Madam';
import Kanisson from '../../components/Projects/Kanisson';

import './styles.scss';

import madam from '../../media/projects/madam.png';
import kanisson from '../../media/projects/kanisson.png';
import sudoku from '../../media/projects/sudoku.png';

const Portfolio = () => {

  useEffect(() => {
    document.title = "Adrien Lacourpaille - Projets";

    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='portfolio'>

      <nav className='portfolio__menu'>
        <ul className='portfolio__menu__list'>

          <a
            key={0}
            className='portfolio__menu__list__item projet-2'
            href='#kanisson'
          >
            <img
              className='portfolio__menu__list__item__img'
              alt='Icône du site'
              src={kanisson}
            />
            <p className='portfolio__menu__list__item__title'>
              Kanisson
            </p>
          </a>

          <a
            key={1}
            className='portfolio__menu__list__item projet-1'
            href='#sudocute'
          >
            <img
              className='portfolio__menu__list__item__img'
              alt='Icône du site'
              src={sudoku}
            />
            <p className='portfolio__menu__list__item__title'>
              SudoCute
            </p>
          </a>

          <a
            key={2}
            className='portfolio__menu__list__item projet-3'
            href='#madam'
          >
            <img
              className='portfolio__menu__list__item__img'
              alt='Icône du site'
              src={madam}
            />
            <p className='portfolio__menu__list__item__title'>
              MaDaM
            </p>
          </a>
        </ul>
      </nav>

      <Projects />

      <hr />

      <section id='kanisson'>
        <Kanisson />
      </section>

      <hr />

      <section id='sudocute'>
        <Sudocute />
      </section>

      <hr />

      <section id='madam'>
        <Madam />
      </section>

    </div>
  );
};

export default Portfolio;