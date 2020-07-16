import React, { useState, useMemo, useCallback, useEffect } from 'react';
import debounce from 'lodash/debounce'; 
import { NavLink, useLocation } from 'react-router-dom';
import { BreadCrumbs } from '../BreadCrumbs/BreadCrumbs';
import './FilmPage.scss';

type Props = {
  films: FilmItem[];
};

export const FilmPage: React.FC<Props> = ({ films }) => {
  const [movies, setMovies] = useState(films);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortName, setSortName] = useState(false);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query: string = searchParams.get('query') || '';

  const visibleFilms = useMemo(() => {
    const getVisibleMovies = films.filter(film => {
    const title = film.title.toLowerCase();

      return title.includes(filterQuery.toLowerCase());
    });

    return getVisibleMovies;
  }, [films, filterQuery]);

  useMemo(() => setMovies(visibleFilms),
  [visibleFilms]);

const setFilterQueryWithDebounce = useCallback(
  debounce(setFilterQuery, 1000), [],
);

  const handleSearchFilm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    searchParams.set('query', event.target.value);
    setFilterQueryWithDebounce(event.target.value);
  };

  useEffect(() => {
    setSearchQuery(query);
  }, [query]);

  const handleSortByName = () => {
    if (!sortName) {
      setSortName(true);
      const sortedMovies = [...movies].sort((a, b) => a.title.localeCompare(b.title));
      setMovies(sortedMovies)
    } else {
      setSortName(false);
      const sortedMovies = [...movies].sort((a, b) => b.title.localeCompare(a.title));
      setMovies(sortedMovies)
    }
  };

return (
<>
<div className="container filmPage">
  <BreadCrumbs />
  <div className="filmPage__control">
    <input
      type="text"
      id="search-query"
      className="form__control"
      placeholder={`Search in ${location.pathname.slice(1)}...`}
      value={searchQuery}
      onChange={handleSearchFilm}
    />
  </div>
  <button
    className="filmPage__sortButton"
    onClick={handleSortByName}
  >
    Sort by name
  </button>
  <ul className="films__list list">
    {movies.map(item => (
              <NavLink
              to={`/films/${item.title}`}
              className="list__link"
            >
      <li
      className="list__item item"
        key="item.title"
      >
          <h2 className="item__title">
            {item.title}
          </h2>   
          <p className="item__episode">
            Episode {item.episode_id}
          </p>
          <span className="item__info">
            Director: {item.director}
            <br/>
            Release Date: {item.release_date}
          </span>


      </li>
      </NavLink>
    ))}
  </ul>
</div>

</>
)
}