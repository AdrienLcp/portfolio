import React, { useEffect } from 'react';

import Projects from '../../components/Projects';
import Maja from '../../components/Projects/Maja';
import Todolist from '../../components/Projects/Todolist';
import Madam from '../../components/Projects/Madam';

import './styles.scss';

import madam from '../../media/projects/madam.png';
import list from '../../media/projects/list.svg';
import maja from '../../media/projects/maja.svg';

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
            href='#todolist'
          >
            <img
              className='portfolio__menu__list__item__img'
              alt='Icône du site'
              src={list}
            />
            <p className='portfolio__menu__list__item__title'>
              Procrastinalist
            </p>
          </a>

          <a
            key={1}
            className='portfolio__menu__list__item projet-1'
            href='#maja'
          >
            <img
              className='portfolio__menu__list__item__img'
              alt='Icône du site'
              src={maja}
            />
            <p className='portfolio__menu__list__item__title'>
              MAJA
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

      <section id='todolist'>
        <Todolist />
      </section>

      <hr />

      <section id='maja'>
        <Maja />
      </section>

      <hr />

      <section id='madam'>
        <Madam />
      </section>

    </div>
  );
};

export default Portfolio;