// eslint-disable-next-line
/// <reference types="react-scripts" />



interface FilmItem {
  title: string;
  url: string;
  episode_id: string;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: Date;
  starships: Array<string>;
  planets: Array<string>;
  films:string;
}

interface Planet {
  name: string,
  url: string,  
}

interface Starship {
    name: string,
    url: string,  
  }

