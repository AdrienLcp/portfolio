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
        Depuis la fin de ma formation chez O'Clock, j'ai créé, pour l'instant, 3 sites intéressants (sans compter mon portfolio).
        <br />
        <br />
        Ils sont tous en ligne, et les codes sont visibles sur mon
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
        Ayant dû trouver un travail en attendant d'être embauché en développement, je n'avais pas beaucoup de temps libre pour coder des projets personnels. J'y passais tout de même une dizaine d'heures par semaine au minimum.
        <br />
        <br />
        Cliquez sur un projet pour le voir. <span className='projects__text_violet'>Bonne visite !</span>
      </p>

      <h4 className='projects__title'>
        Projets en cours
      </h4>

      <p className='projects__text'>
        Depuis mars 2023, je suis développeur pour une entreprise près de Nantes. Je m'initie au C# et au XAML, et j'utilise un peu de mon temps libre pour les finitions de mes projets.
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