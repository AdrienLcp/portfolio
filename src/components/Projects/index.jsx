import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import './styles.scss';

const Projects = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className='projects'>
      <h4 className='projects__title'>
        Mes Projets
      </h4>

      <p className='projects__text'>
        Depuis la fin de ma formation chez O'Clock, j'ai créé, pour l'instant, 3 sites (sans compter mon portfolio).
        <br />
        <br />
        Ils sont tous en ligne, et les codes sont visibles sur 
        <a
          href='https://github.com/AdrienLcp'
          target='_blank'
          rel='noreferrer'
          className='projects__text_violet'
        >
          Github
        </a>
        .
        <br />
        <br />
        Ayant dû trouver un travail en attendant d'être embauché en développement, je n'ai plus beaucoup de temps de libre pour coder des projets personnels. J'y passe tout de même une dizaine d'heures par semaine au minimum.
        <br />
        <br />
        Cliquez sur un projet pour le voir. <span className='projects__text_violet'>Bonne visite !</span>
      </p>

      <h4 className='projects__title'>
        Projets en cours
      </h4>
      
      <p className='projects__text'>
        En ce moment, je travaille sur un site de quizz participatif ainsi que sur un jeu de mots croisés.
        <br />
        <br />
        Je réfléchis également à me lancer dans l'auto-entreprenariat, pour plus de liberté dans mes projets et la gestion de mon temps de travail.
        <br />
        <br />
        Les projets déjà présents et "terminés" sont également toujours en cours d'amélioration, par ci par là, quand j'ai une nouvelle idée.
      </p>

      <h4 className='projects__title'>
        Collaborations
      </h4>

      <p className='projects__text'>
        Je suis ouvert à toute proposition pour un projet en duo ou en équipe pour étoffer mon portfolio.
        <br />
        N'hésitez pas à 
          <NavLink
            to='/contact'
            className='projects__text_violet'
          >
            me contacter
          </NavLink> !
      </p>
    </section>
  );
};

export default Projects;