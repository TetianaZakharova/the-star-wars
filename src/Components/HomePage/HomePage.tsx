import React from 'react';
import './HomePage.scss';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {

  return (
    <div className="homePage container">
      <div className="homePage__loadFilmsButton">
        <Link
         className="homePage__link"
          to="/films"
        >
          FORCE
        </Link>
      </div>

    </div>
  );
}

export default HomePage;