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
            to='/'
            className={(navData) => navData.isActive ? 'nav__list__button__item selected' : 'nav__list__button__item'}
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
            to='/competences'
            className={(navData) => navData.isActive ? 'nav__list__button__item selected' : 'nav__list__button__item'}
          >
            <img
              className='nav__list__button__item__icon'
              alt="Icône pour aller aux compétences"
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
            to='/projets'
            className={(navData) => navData.isActive ? 'nav__list__button__item selected' : 'nav__list__button__item'}
          >
            <img
              className='nav__list__button__item__icon'
              alt="Icône pour aller aux projets"
              src={projects}
            />
            <p className='nav__list__button__item__label'>
              Projets
            </p>
          </NavLink>
        </li>
        
        <li 
          key={4}
          className='nav__list__button'
        >
          <NavLink 
            to='/a_propos'
            className={(navData) => navData.isActive ? 'nav__list__button__item selected' : 'nav__list__button__item'}
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
            to='/contact'
            className={(navData) => navData.isActive ? 'nav__list__button__item selected' : 'nav__list__button__item'}
          >
            <img
              className='nav__list__button__item__icon'
              alt="Icône pour aller au formulaire de contact"
              src={contact}
            />
            <p className='nav__list__button__item__label'>
              Contact
            </p>
          </NavLink>
        </li>

      </ul>
    </nav>
  );
};

export default Navigation;