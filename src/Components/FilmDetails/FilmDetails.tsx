import React, { useState, useEffect } from 'react';
import './FilmDetails.scss'
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';


type Props = {
  film : FilmItem;
  planets: Planet[];
  starships: Starship[];
}

export const FilmDetails: React.FC<Props> = ({ film, starships, planets }) => {
  const [planetsInFilm, setPlanetsInFilm] = useState<Planet[]>([]);
  const [starshipsInFilm, setStarshipsInFilm] = useState<Starship[]>([]);

  const planetsList: Array<Planet> = [];
  const starshipsList: Array<Starship> = [];

  useEffect(() => {
    film.planets.forEach(item => {
      const planet = planets.find(planet => planet.url === item);
      
      if (planet) {
        planetsList.push(planet);
      }
    })

    film.starships.forEach(item => {
      const starship = starships.find(starship => starship.url === item);
      
      if (starship) {
        starshipsList.push(starship);
      }
    })

    setPlanetsInFilm(planetsList);
    setStarshipsInFilm(starshipsList);
  }, [])

  return (
    <>
    <BreadCrumbs />
      <div className="film__details details container">
          <h2 className="item__title">
            {film.title}
          </h2>
        <p className="item__episode">
          Episode {film.episode_id}
        </p>
          <span className="item__info">
            <span className="item__info--description">
             {film.opening_crawl}
            </span>
            <br/>
            <br/>
            Director: {film.director}
             <br/>
            Producer: {film.producer}
            <br/>
            Release Date: {film.release_date}
          </span>

        <div className="details__info">
          <div className="info__list">
            <h3 className="details__title">Planets:</h3>
            <ul className="details__list list">
              {planetsInFilm.map(planet => (
                <li className="details__item details__item--planet item" key={planet.url}>
                  {planet.name}
                </li>
              ))}
          </ul>
          </div>
          <div className="info__list">
            <h3 className="details__title">Starships:</h3>
            <ul className="details__list list">
              {starshipsInFilm.map(starship => (
                <li className="details__item details__item--starship item" key={starship.url}>
                  {starship.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
