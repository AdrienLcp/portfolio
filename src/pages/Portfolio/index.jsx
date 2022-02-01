import React, { useEffect, useState, useRef } from 'react';

import Projects from '../../components/Projects';
import Maja from '../../components/Projects/Maja';
import Adrien from '../../components/Projects/Adrien';
import Poupets from '../../components/Projects/Poupets';

import './styles.scss';

import poupets from '../../media/projects/poupets.svg';
import adrien from '../../media/projects/adrien.png';
import maja from '../../media/projects/maja.svg';

const Portfolio = () => {

  const majaRef = useRef(null);
  const poupetsRef = useRef(null);
  const portfolioRef = useRef(null);

  const [showPresentation, setShowPresentation] = useState(true);
  const [showPoupets, setShowPoupets] = useState(false);
  const [showMaja, setShowMaja] = useState(false);
  const [showPortfolio, setShowPortfolio] = useState(false);

  useEffect(() => {
    document.title = "Adrien Lacourpaille - Projets";

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (showMaja === true) {
      majaRef.current.classList.add('project_selected');
    } else {
      majaRef.current.classList.remove('project_selected');
    };
  }, [showMaja]);

  useEffect(() => {
    if (showPortfolio === true) {
      portfolioRef.current.classList.add('project_selected');
    } else {
      portfolioRef.current.classList.remove('project_selected');
    };
  }, [showPortfolio]);

  useEffect(() => {
    if (showPoupets === true) {
      poupetsRef.current.classList.add('project_selected');
    } else {
      poupetsRef.current.classList.remove('project_selected');
    };
  }, [showPoupets]);

  return (
    <div className='portfolio'>
      <nav className='portfolio__menu'>
        <ul className='portfolio__menu__list'>

          <li
            key={0}
            className='portfolio__menu__list__item projet-1'
            ref={majaRef}
            onClick={() => {
              setShowPresentation(false);
              setShowPoupets(false);
              setShowPortfolio(false);
              setShowMaja(true);
            }}
          >
            <img
              className='portfolio__menu__list__item__img'
              alt='Icône du site'
              src={maja}
            />
            <p className='portfolio__menu__list__item__title'>
              MAJA
            </p>
          </li>

          <li
            key={1}
            className='portfolio__menu__list__item projet-2'
            ref={portfolioRef}
            onClick={() => {
              setShowPresentation(false);
              setShowPoupets(false);
              setShowMaja(false);
              setShowPortfolio(true);
            }}
          >
            <img
              className='portfolio__menu__list__item__img'
              alt='Icône du site'
              src={adrien}
            />
            <p className='portfolio__menu__list__item__title'>
              Adrien Lacourpaille
            </p>
          </li>

          <li
            key={2}
            className='portfolio__menu__list__item projet-3'
            ref={poupetsRef}
            onClick={() => {
              setShowPresentation(false);
              setShowPortfolio(false);
              setShowMaja(false);
              setShowPoupets(true);
            }}
          >
            <img
              className='portfolio__menu__list__item__img'
              alt='Icône du site'
              src={poupets}
            />
            <p className='portfolio__menu__list__item__title'>
              Les Poupets
            </p>
          </li>

        </ul>
      </nav>
      
      {showPresentation && (
        <Projects />
      )}

      {showMaja && (
        <Maja
          setShowMaja={setShowMaja}
          setShowPresentation={setShowPresentation}
        />
      )}

      {showPoupets && (
        <Poupets
          setShowPoupets={setShowPoupets}
          setShowPresentation={setShowPresentation}
        />
      )}

      {showPortfolio && (
        <Adrien
          setShowPortfolio={setShowPortfolio}
          setShowPresentation={setShowPresentation}
        />
      )}
    </div>
  );
};

export default Portfolio;