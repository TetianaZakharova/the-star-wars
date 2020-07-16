import React, { useState, useEffect } from 'react';
import { getFilms, getPlanets, getStarships } from './api/api';
import './App.scss';
import { FilmPage } from './Components/FilmPage/FilmPage';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './Components/HomePage/HomePage';
import { NotFoundPage } from './Components/NotFoundPage';
import { FilmDetails } from './Components/FilmDetails/FilmDetails';

export const App: React.FC = () => {

  const [films, setFilms] = useState<FilmItem[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [starships, setStarships] = useState<Starship[]>([]);

  useEffect(() => {
    getFilms()
      .then(data => {
        setFilms(data.results);
      })

    getPlanets()
      .then(data => {
        setPlanets(data.results);
      })
  
      getStarships()
      .then(data => {
        setStarships(data.results);
      })
  }, []);

// useEffect(() => {
//   getPlanets()
//     .then(data => {
//       setPlanets(data.results);
//     })

//     getStarships()
//     .then(data => {
//       setStarships(data.results);
//     })
// }, []);

  return (
  <>
    <Switch>
      <Route
        exact
        path="/"
        render={() => (
          <HomePage />
        )}
      />
      <Route
        exact
        path="/films"
        render={() => (
          <FilmPage films={films} />
        )}
      />
      {films.map(film  => (
        <Route
          path={`/films/${film.title}`}
          render={() => (
            <FilmDetails film={film} planets={planets} starships={starships} />
          )}
        />
      ))}
      <Redirect from="/home" to="/" />
      <Route component={NotFoundPage} />
    </Switch>
  </>
  )
};

