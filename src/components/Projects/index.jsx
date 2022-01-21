import React from 'react';

import './styles.scss';

const Projects = () => {

  return (
    <section className='projects'>
      <h4 className='projects__title'>
        Mes Projets
      </h4>

      <p className='projects__text'>
        Depuis la fin de ma formation chez O'Clock, j'ai créé, pour l'instant, 3 sites.
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
        Ayant dû trouver un travail en attendant d'être embauché en développement, je n'ai plus beaucoup de temps de libre pour coder des projets personnels. J'y passe une dizaine d'heures par semaine au minimum.
      </p>

      <h4 className='projects__title'>
        Projets en cours
      </h4>
      
      <p className='projects__text'>
        En ce moment, je travaille sur l'adaptation de MAJA sur mobile, en React Native. Je suis dans l'attente de réponse des développeurs de Deezer qui n'ont pas encore rempli la doc au sujet de leur SDK, qui n'est pour l'instant utilisable qu'avec du HTML.
        <br />
        <br />
        Je réfléchis aussi, avec un collaborateur, sur un site de Quizz participatif. À l'image de <span className='projects__text_violet'>MAJA</span>, les utilisateurs pourront créer leur propres quizz, choisir ou créer un thème, une difficulté et des questions / réponses. Les visiteurs pourront, quant à eux, y jouer, répondre aux questions, et donner une note au quiz pour mieux le référencer. Il y aura aussi un système d'authentification.
        <br />
        <br />
        Les projets déjà présents et "terminés" sont également toujours en cours d'amélioration, par ci par là, quand j'ai une nouvelle idée.
      </p>

      <h4 className='projects__title'>
        Projets à venir
      </h4>

      <p className='projects__text'>
        Je suis ouvert à toute proposition pour un projet en duo ou en équipe pour étoffer mon portfolio.
        <br />
        N'hésitez pas à me contactez !
        <br />
        <br />
        Cliquez sur un projet pour le voir. <span className='projects__text_violet'>Bonne visite !</span>
      </p>
    </section>
  );
};

export default Projects;