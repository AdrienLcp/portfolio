import React from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

import home from '../../media/nav/home.svg';
import profil from '../../media/nav/profil.svg';
import projects from '../../media/nav/projects.svg';
import contact from '../../media/nav/contact.svg';
import knowledges from '../../media/nav/knowledge.svg';

const Navigation = () => {

  return (
    <nav className='nav'>
      <ul className='nav__list'>
         
        <li 
          key={1} 
          className='nav__list__button'
        >
          <NavLink
            exact to='/'
            className='nav__list__button__item'
            activeClassName='active'
          >
            <img
              className='nav__list__button__item__icon'
              alt="Icône pour aller à l'accueil"
              src={home}
            />
            <p className='nav__list__button__item__label'>
              Accueil
            </p>
          </NavLink>
        </li>
        
        <li 
          key={2}
          className='nav__list__button'
        >
          <NavLink 
            exact to='/competences'
            className='nav__list__button__item'
            activeClassName='active'
          >
            <img
              className='nav__list__button__item__icon'
              alt="Icône pour aller au CV"
              src={knowledges}
            />
            <p className='nav__list__button__item__label'>
              Compétences
            </p>
          </NavLink>
        </li>

        <li 
          key={3}
          className='nav__list__button'
        >
          <NavLink 
            exact to='/projets'
            className='nav__list__button__item'
            activeClassName='active'
          >
            <img
              className='nav__list__button__item__icon'
              alt="Icône pour aller aux projets"
              src={projects}
            />
            <p className='nav__list__button__item__label'>
              Mes projets
            </p>
          </NavLink>
        </li>
        
        <li 
          key={4}
          className='nav__list__button'
        >
          <NavLink 
            exact to='/a_propos'
            className='nav__list__button__item'
            activeClassName='active'
          >
            <img
              className='nav__list__button__item__icon'
              alt="Icône pour aller au profil"
              src={profil}
            />
            <p className='nav__list__button__item__label'>
              À propos de moi
            </p>
          </NavLink>
        </li>

        <li
          key={5}
          className='nav__list__button'
        >
          <NavLink
            exact to='/contact'
            className='nav__list__button__item'
            activeClassName='active'
          >
            <img
              className='nav__list__button__item__icon'
              alt="Icône pour aller au formulaire de contact"
              src={contact}
            />
            <p className='nav__list__button__item__label'>
              Contactez-moi
            </p>
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default Navigation;